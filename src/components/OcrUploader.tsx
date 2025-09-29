import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OcrUploaderProps {
  onDataExtracted: (data: any) => void;
}

export const OcrUploader = ({ onDataExtracted }: OcrUploaderProps) => {
  const [ocrText, setOcrText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!ocrText.trim()) {
      toast({
        title: "Error",
        description: "Please paste OCR output text first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-ocr-data', {
        body: { ocrText: ocrText.trim() }
      });

      if (error) throw error;

      if (data?.data) {
        onDataExtracted(data.data);
        toast({
          title: "Success",
          description: "Data extracted successfully!",
        });
      } else {
        throw new Error("No data returned from extraction");
      }
    } catch (error) {
      console.error('Error processing OCR:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process OCR data",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">OCR Text Input</h2>
      <p className="text-muted-foreground mb-6">
        Paste the OCR output text below and click process to extract structured data.
      </p>
      
      <Textarea
        placeholder="Paste OCR output here... (e.g., Name: John Smith, Age: 30, Gender: Male...)"
        value={ocrText}
        onChange={(e) => setOcrText(e.target.value)}
        className="min-h-[200px] mb-4 font-mono text-sm"
      />
      
      <Button
        onClick={handleProcess}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : "Process OCR Data"}
      </Button>
    </Card>
  );
};
