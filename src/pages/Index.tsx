import { useState } from "react";
import { OcrUploader } from "@/components/OcrUploader";
import { ExtractedDataForm } from "@/components/ExtractedDataForm";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  age: string;
  gender: string;
  address: string;
  country: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [extractedData, setExtractedData] = useState<FormData | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const { toast } = useToast();

  const handleDataExtracted = (data: FormData) => {
    setExtractedData(data);
  };

  const handleEdit = (field: keyof FormData, value: string) => {
    if (extractedData) {
      setExtractedData({ ...extractedData, [field]: value });
    }
  };

  const handleVerification = () => {
    toast({
      title: "Verification Complete",
      description: "Form data has been verified successfully!",
    });
    console.log("Verified data:", extractedData);
  };

  const handleProcessAnother = () => {
    setExtractedData(null);
    setViewMode(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {!extractedData ? (
        <OcrUploader onDataExtracted={handleDataExtracted} />
      ) : (
        <ExtractedDataForm
          data={extractedData}
          onEdit={handleEdit}
          onVerification={handleVerification}
          onProcessAnother={handleProcessAnother}
          viewMode={viewMode}
          onToggleMode={() => setViewMode(!viewMode)}
        />
      )}
    </div>
  );
};

export default Index;
