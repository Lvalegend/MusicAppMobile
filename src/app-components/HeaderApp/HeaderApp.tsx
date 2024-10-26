import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";

interface HeaderAppProps {
  title: string;
  iconLeft?: any
  iconRight?: any;
  style?: any;
}

const HeaderApp: React.FC<HeaderAppProps> = ({ title, iconLeft, iconRight, style }) => {
  return (
    <Box style={[{ ...styles_c.row_between, marginHorizontal: 20 }, style]}>
      {iconLeft && (
        <Box>
          {iconLeft}
        </Box>
      )}
      <Text fontSize={sizes._30sdp} fontWeight="bold">
        {title}
      </Text>
      {iconRight && (
        <Box>
          {iconRight}
        </Box>
      )}
    </Box>
  );
};

export default HeaderApp;
