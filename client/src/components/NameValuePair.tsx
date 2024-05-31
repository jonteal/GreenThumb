export const NameValuePair = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <div className={`${className} flex flex-col items-start gap-1`}>
      <h4 className="text-sm text-gray-600">{label}</h4>
      <p>{value}</p>
    </div>
  );
};
