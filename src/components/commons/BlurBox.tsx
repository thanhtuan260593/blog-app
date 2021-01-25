import { Box, chakra } from "@chakra-ui/react";
import React from "react";
interface Props {
  children: React.ReactNode;
  onActuallyBlur?: () => void;
}
const Component = (props: Props) => {
  const ref = React.useRef<NodeJS.Timeout>();
  const handleBlur = React.useCallback(() => {
    if (props.onActuallyBlur == null) return;
    ref.current = setTimeout(props.onActuallyBlur, 200);
  }, [props]);
  const handleFocus = React.useCallback(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
  }, []);
  React.useEffect(() => {
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, []);
  return (
    <Box onFocus={handleFocus} onBlur={handleBlur}>
      {props.children}
    </Box>
  );
};

export const BlurBox = chakra(Component);
