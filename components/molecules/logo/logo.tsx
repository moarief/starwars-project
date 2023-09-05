import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  redirectPath: string;
  imageUrl: string;
};

/**
 * Logo component - Displays an image wrapped in a link
 *
 * @param {LogoProps} { redirectPath, imageUrl }
 * @returns {JSX.Element}
 */
export const Logo = ({ redirectPath, imageUrl }: LogoProps): JSX.Element => {
  return (
    <>
      <Link href={redirectPath} prefetch>
        <Image
          className="relative"
          src={imageUrl}
          alt="Disney Logo"
          width={79}
          height={10}
          priority
        />
      </Link>
    </>
  );
};
