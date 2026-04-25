import FileUpload from './file-upload.component';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const FileUploadMotion = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 sm:mt-10 px-2 sm:px-4">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Upload file</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Only CSV files are supported. Drag & drop or click to upload.
        </CardDescription>
      </CardHeader>
      <FileUpload />
    </Card>
  );
};

export default FileUploadMotion;
