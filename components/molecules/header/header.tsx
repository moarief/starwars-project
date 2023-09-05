type HeaderProps = {
  total: number;
  title: string;
};

export const Header = ({ total, title }: HeaderProps) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      <span>
        {total ? total : null} {title}
      </span>
    </h2>
  );
};
