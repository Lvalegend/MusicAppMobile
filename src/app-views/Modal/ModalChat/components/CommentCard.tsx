import URL_API from "@app-helper/urlAPI"
import { formatDate } from "@app-helper/utilities"
import { LOGOAPP } from "@app-uikits/image"
import colors from "@assets/colors/global_colors"
import sizes from "@assets/styles/sizes"
import styles_c from "@assets/styles/styles_c"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import Entypo from '@expo/vector-icons/Entypo';
import { CommentSchema } from "@redux/features/commentSlice"
import { Image } from "expo-image"
import { Box, Text } from "native-base"
import { ScrollView, TouchableOpacity } from "react-native"
import { ResponeChatData } from "../ModalChat"

interface CommentCardProps {
  data?: CommentSchema | ResponeChatData
  handleReplyMessage?: () => void
  isReply?: boolean,
  receiveCommentId?: any
  replyToName?: string
}
const CommentCard: React.FC<CommentCardProps> = ({ data, handleReplyMessage, isReply = false, receiveCommentId, replyToName }) => {

  return (
    <Box marginX={'15px'} marginY={'5px'} paddingLeft={isReply ? 5 : 0}>
      <Box style={{ ...styles_c.row_between }}>
        <Box style={{ ...styles_c.row_between, gap: 10 }}>
          <Box alignSelf={'flex-start'}>
            <Image
              source={data?.user_avatar ? { uri: `${URL_API}image/${data?.user_avatar}` } : LOGOAPP}
              style={{ width: sizes._40sdp, height: sizes._40sdp, borderRadius: 9999 }}
            />
          </Box>
          <Box>
            <Box style={{ ...styles_c.row_direction_align_center, gap: 5 }}>
              <ScrollView horizontal style={{ maxWidth: sizes._250sdp }}>
                <Box width={'full'}>
                  <Text
                    style={{ ...styles_c.font_text_14_600 }}
                    >
                    {data?.user_name}
                  </Text>
                </Box>
              </ScrollView>
              {/* <Box style={{ backgroundColor: colors.purple, paddingHorizontal: 10, borderRadius: 6 }}>
                <Text style={{ ...styles_c.font_text_10_600, color: colors.text_white }}>PLUS</Text>
              </Box> */}
            </Box>
            {isReply &&
              <Box style={{ ...styles_c.row_direction_align_center, gap: 5, marginVertical: 5 }}>
                <Entypo name="triangle-right" size={sizes._15sdp} color="black" />
                <Box>
                  <Text style={{ ...styles_c.font_text_14_600 }}>
                    {replyToName || ''}
                  </Text>
                </Box>
              </Box>
            }
            <Box style={{ width: sizes._270sdp }}>
              <Text style={{ flexWrap: 'wrap' }}>
                {data?.message}
              </Text>
            </Box>
          </Box>
        </Box>
        <TouchableOpacity style={{ alignSelf: 'flex-start', marginTop: 10 }}>
          <SimpleLineIcons name="options-vertical" size={sizes._18sdp} color={colors.gray_primary} />
        </TouchableOpacity>
      </Box>
      <Box style={{ ...styles_c.row_direction_align_center, marginLeft: 45 }}>
        <Box marginRight={'5px'}>
          <Text style={{ ...styles_c.font_text_12_400, color: colors.text_gray }}>{formatDate(data?.created_at)}</Text>
        </Box>
        <TouchableOpacity style={{ padding: 5 }}>
          <MaterialIcons name="favorite-border" size={sizes._18sdp} color={colors.gray_primary} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 5 }} onPress={() => { handleReplyMessage(), receiveCommentId(data?.comment_id, data?.parent_comment_id) }}>
          <Text style={{ ...styles_c.font_text_14_600 }} color={colors.text_gray}>
            Trả lời
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}
export default CommentCard