import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface FormData {
  name: string;
  age: string;
  gender: string;
  address: string;
  country: string;
  phone: string;
  email: string;
}

interface ExtractedDataFormProps {
  data: FormData;
  onEdit: (field: keyof FormData, value: string) => void;
  onVerification: () => void;
  onProcessAnother: () => void;
  viewMode: boolean;
  onToggleMode: () => void;
}

export const ExtractedDataForm = ({
  data,
  onEdit,
  onVerification,
  onProcessAnother,
  viewMode,
  onToggleMode
}: ExtractedDataFormProps) => {
  return (
    <Card className="w-full max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Digital Form - Extracted Data</h1>
        <p className="text-muted-foreground">
          Review and edit the extracted information below before verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onEdit("name", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            value={data.age}
            onChange={(e) => onEdit("age", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            value={data.gender}
            onChange={(e) => onEdit("gender", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={data.address}
            onChange={(e) => onEdit("address", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={data.country}
            onChange={(e) => onEdit("country", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onEdit("phone", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onEdit("email", e.target.value)}
            disabled={viewMode}
            className="text-base"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          variant="outline"
          onClick={onToggleMode}
          className="flex items-center gap-2"
        >
          <span className="text-lg">📄</span>
          {viewMode ? "Switch to Edit Mode" : "Switch to View Mode"}
        </Button>
        
        <Button
          variant="secondary"
          onClick={onProcessAnother}
          className="flex items-center gap-2"
        >
          <span className="text-lg">📤</span>
          Process Another Document
        </Button>
        
        <Button
          onClick={onVerification}
          className="ml-auto"
        >
          Verification
        </Button>
      </div>
    </Card>
  );
};
