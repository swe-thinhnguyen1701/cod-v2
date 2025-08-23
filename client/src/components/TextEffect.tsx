import { Text, } from "@chakra-ui/react";

interface Props {
    text: string
}

const textModifier = (text: string) => {
  const parts = text.split(
    /(\{bold\}|\{\/bold\}|\{newline\}|\{lightgrey\}|\{\/lightgrey\}|\{green\}|\{\/green\})/g
  );
  let effect: "bold" | "lightgrey" | "green" | null = null;

  return parts.map((part, idx) => {
    switch (part) {
      case "{bold}":
        effect = "bold";
        return null;
      case "{/bold}":
        effect = null;
        return null;
      case "{lightgrey}":
        effect = "lightgrey";
        return null;
      case "{/lightgrey}":
        effect = null;
        return null;
      case "{green}":
        effect = "green";
        return null;
      case "{/green}":
        effect = null;
        return null;
      case "{newline}":
        return <br key={idx} />;
      default:
        if (effect === "lightgrey") {
          return (
            <Text as="span" key={idx} color="gray.500">
              {part}
            </Text>
          );
        }
        if (effect === "green") {
          return (
            <Text as="span" key={idx} color="green.500">
              {part}
            </Text>
          );
        }
        if (effect === "bold") {
          return (
            <Text as="span" key={idx} fontWeight="bold">
              {part}
            </Text>
          );
        }
        return (
          <Text as="span" key={idx}>
            {part}
          </Text>
        );
    }
  });
};

const TextEffect = ({text}: Props) => {
    return (
        <Text>{textModifier(text)}</Text>
    )
}

export default TextEffect;
