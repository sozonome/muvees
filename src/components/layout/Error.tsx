import { Button, Grid, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <Grid marginX={8}>
      <Heading textAlign="center" fontSize="lg" fontWeight="400">
        Uh-oh, something&apos;s wrong
      </Heading>

      <Image src="/No data-bro.svg" width="300" height="300" alt="No Data" />

      <Link href="/" passHref>
        <Button as="a">Let&apos;s Go Back</Button>
      </Link>
    </Grid>
  );
};

export default Error;
