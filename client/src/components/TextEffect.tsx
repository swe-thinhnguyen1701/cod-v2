import { Text, } from "@chakra-ui/react";

interface Props {
  text: string
  scalingValue?: number
}

const textModifier = (text: string, scalingValue: number) => {
  const parts = text.split(
    /(\{bold\}|\{\/bold\}|\{newline\}|\{lightgrey\}|\{\/lightgrey\}|\{green\}|\{\/green\}|\{orange\}|\{\/orange\}|\{scaling_value_1\})/g
  );
  let effect: "bold" | "lightgrey" | "green" | "orange" | "scaling_value_1" | null = null;

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
      case "{orange}":
        effect = "orange";
        return null;
      case "{/orange}":
        effect = null;
        return null;
      case "{scaling_value_1}":
        effect = "scaling_value_1";
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
        if (effect === "orange") {
          return (
            <Text as="span" key={idx} color="orange.400" fontWeight="bold">
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
        if (effect === "scaling_value_1") {
          return (
            <Text as="span" key={idx}>
              <Text as="span" color="green.500" fontWeight="bold">
                + {scalingValue.toFixed(2)}
              </Text>
              {part}
            </Text>
          )
        }
        return (
          <Text as="span" key={idx}>
            {part}
          </Text>
        );
    }
  });
};

const TextEffect = ({ text, scalingValue }: Props) => {
  return (
    <Text>{textModifier(text, scalingValue ?? 0)}</Text>
  )
}

export default TextEffect;
