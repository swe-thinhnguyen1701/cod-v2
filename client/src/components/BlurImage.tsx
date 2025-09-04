import { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import Spinner from "./Spinner";

interface BlurImageProps {
    src: string;
    alt: string;
}

const BlurImage = ({ src, alt }: BlurImageProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Box position="relative" width="100%" height="100%">
            {/* Placeholder while image loads */}
            {!loaded && (
                // <Skeleton
                //   position="absolute"
                //   top={0}
                //   left={0}
                //   width="100%"
                //   height="100%"
                //   startColor="gray.300"
                //   endColor="gray.500"
                //   borderRadius="md"
                // />
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    zIndex={1}>
                    <Spinner />
                </Box>
            )}

            {/* Actual Image */}
            <Image
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                transition="filter 0.3s ease-out"
                filter={loaded ? "blur(0px)" : "blur(20px)"}
                width="100%"
                className="item-image"
            />
        </Box>
    );
};

export default BlurImage;
