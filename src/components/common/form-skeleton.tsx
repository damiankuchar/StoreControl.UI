import { Skeleton } from "../ui/skeleton";

interface FormSkeletonProps {
  count: number;
}

const FormSkeleton = ({ count }: FormSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-36 rounded-md" />
          <Skeleton className="h-9 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default FormSkeleton;
