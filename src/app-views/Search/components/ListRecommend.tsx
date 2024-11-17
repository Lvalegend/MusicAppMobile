import colors from "@assets/colors/global_colors"
import styles_c from "@assets/styles/styles_c"
import { Box, Text } from "native-base"
import { FlatList, TouchableOpacity } from "react-native"

type DataRecommended = {
  id: number,
  name: string
}

interface ListRecommendedProps { }

const ListRecommended: React.FC<ListRecommendedProps> = () => {
  const data: DataRecommended[] = [
    { id: 1, name: 'anh đau từ lúc em đi' },
    { id: 2, name: 'nơi vực nơi trời' },
    { id: 3, name: 'chăm hoa' },
    { id: 4, name: 'chị đẹp đạp gió' },
    { id: 5, name: 'ngủ ngon' },
  ]

  const renderItem = ({ item }: { item: DataRecommended }) => {
    return (
      <TouchableOpacity>
        <Box
          style={{
            borderRadius: 10,
            backgroundColor: colors.white_gray,
            padding: 8,
            alignSelf: 'stretch',
            ...styles_c.col_center,
            marginRight: 10,
            marginVertical: 10
          }}
        >
          <Text color={colors.text_black}>{item?.name}</Text>
        </Box>
      </TouchableOpacity>
    )
  }

  return (
    <Box>
      <Box my={2} mt={4}>
        <Text style={{ ...styles_c.font_text_16_600 }}>Đề xuất cho bạn</Text>
      </Box>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: DataRecommended) => item?.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
      />
    </Box>
  )
}

export default ListRecommended
