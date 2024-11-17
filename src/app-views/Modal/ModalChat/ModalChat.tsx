import SwitchCustom from "@app-components/SwitchCustom/SwitchCustom";
import colors from "@assets/colors/global_colors";
import sizes from "@assets/styles/sizes";
import styles_c from "@assets/styles/styles_c";
import { Box, Text } from "native-base";
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal, StyleSheet, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import CommentCard from "./components/CommentCard";
import Feather from '@expo/vector-icons/Feather';
import SocketServices from "@app-services/socket-services";
import ServiceStorage, { KEY_STORAGE } from "@app-services/service-storage";
import { useDispatch, useSelector } from "react-redux";
import { CommentSchema, getCommentData, sendCommentData } from "@redux/features/commentSlice";
import LoadingBase from "@app-components/LoadingBase/LoadingBase";

interface ModalChatProps {
  isVisible: boolean;
  onClose: () => void;
}

export type CommentId = number | string | null

export type ResponeChatData = {
  comment_id?: number,
  song_id?: number | string,
  user_id?: number,
  parent_comment_id?: CommentId,
  reply_to_comment_id?: CommentId,
  user_name?: string;
  user_avatar?: string;
  message?: string;
  created_at?: Date;
  updated_at?: Date | null,
  report?: boolean,
  report_message?: string,
  comment_entity_id?: string,
}
const ModalChat: React.FC<ModalChatProps> = ({ isVisible, onClose }) => {
  const { listOptionTabData, listOptionTabDataCurrent } = useSelector((state: any) => state.songScreen)
  const songId = listOptionTabDataCurrent[0]?.song_id
  const [inputText, setInputText] = useState("");
  const [disableButtonSendMessage, setDisableButtonSendMessage] = useState(true);
  const [responseChatData, setResponseChatData] = useState<ResponeChatData[]>([])
  const [parentCommentId, setParentCommentId] = useState<CommentId>(null)
  const [replyToCommentId, setReplyToCommentId] = useState<CommentId>(null)
  const [userData, setUserData] = useState<any>(null)
  const [token, setToken] = useState<string>()
  const inputRef = useRef<any>(null);
  const { filterPaginationCommentResponse,hasMoreFilterPaginationCommentResponse, loading } = useSelector((state: any) => state.comment)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
      setToken(token)
      const data = await ServiceStorage.getObject(KEY_STORAGE.ACCOUNT_DATA);
      setUserData(data)
    })();
  }, []);

  useEffect(() => {
    if (inputText !== "") {
      setDisableButtonSendMessage(false);
    } else {
      setDisableButtonSendMessage(true);
    }
  }, [inputText]);

  const receiveCommentId = (commentId: CommentId, parentId: CommentId) => {
    if (parentId === null) {
      setParentCommentId(commentId);  // Gán comment_id của bình luận cha vào parent_comment_id
      setReplyToCommentId(null);         // Không có reply_comment_id nếu đây là bình luận gốc
    }
    // Nếu đang trả lời bình luận trả lời
    else {
      setParentCommentId(parentId);   // Gán parent_comment_id là comment_id của bình luận trả lời cha
      setReplyToCommentId(commentId);   // Gán reply_comment_id là comment_id của bình luận trả lời con
    }
  }

  useEffect(() => {
    if (songId && userData) {
      (async () => {
        await SocketServices.initializeSocket();
        await SocketServices.emit('joinRoom', {
          songId: songId,
          user_name: userData?.user_name,
          user_avatar: userData?.user_avatar
        });
        await SocketServices.on('chatMessage', ({
          comment_id,
          song_id,
          user_id,
          parent_comment_id,
          reply_to_comment_id,
          message,
          created_at,
          updated_at,
          report,
          report_message,
          comment_entity_id,
          user_name,
          user_avatar
        }: ResponeChatData) => {

          console.log('New message receiveddddddddddddđ:', {
            comment_id,
            song_id,
            user_id,
            parent_comment_id,
            reply_to_comment_id,
            message,
            created_at,
            updated_at,
            report,
            report_message,
            comment_entity_id,
            user_name,
            user_avatar
          });

          setResponseChatData(prevResponseChatData => [
            {
              comment_id,
              song_id,
              user_id,
              parent_comment_id,
              reply_to_comment_id,
              message,
              created_at,
              updated_at,
              report,
              report_message,
              comment_entity_id,
              user_name,
              user_avatar
            },
            ...prevResponseChatData
          ]);
        });
        return () => {
          SocketServices.removeListener('chatMessage');
        };
      })()
    }
  }, [songId, userData])

  const sendMessage = () => {
    if (inputText.trim() !== "" && userData) {
      const data: CommentSchema = {
        song_id: Number(songId),
        parent_comment_id: parentCommentId || null,
        reply_to_comment_id: replyToCommentId || null,
        message: inputText,
        updated_at: null,
        report: false,
        report_message: null,
        user_name: userData?.user_name,
        user_avatar: userData?.user_avatar,
      }
      dispatch(sendCommentData({ token: token, data: data }))
      setInputText("");
      setParentCommentId(null)
      setReplyToCommentId(null)
    }
  }

  // useEffect(() => {
  //   if (!listOptionTabData.find(existingItem => existingItem.song_id === songId)) {
  //     dispatch(getCommentData({ page: 1, limit: 15, filterColumn: 'song_id', filterValue: songId }))
  //   }
  // }, [songId])

  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    if (hasMoreFilterPaginationCommentResponse && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(getCommentData({ page: nextPage, limit: 15, filterColumn: 'song_id', filterValue: songId }))
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      handleLoadMore()
    }
  };

  console.log('filterPaginationCommentResponse', JSON.stringify(filterPaginationCommentResponse))


  useEffect(() => {
    const data = filterPaginationCommentResponse
      ?.filter((item: any) => item.filterValue == songId && item.filterColumn === 'song_id')
      .flatMap((item: any) => item?.result?.data || []);

    setResponseChatData(data);
  }, [filterPaginationCommentResponse, songId]);


  const handleReplyClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
          <KeyboardAvoidingView
            style={styles.modalView}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Box marginY={"15px"} flex={1}>
                <Box style={{ borderBottomWidth: 1, paddingBottom: 5 }}>
                  <Box style={{ marginHorizontal: 10, ...styles_c.row_between }}>
                    <Box></Box>
                    <Box paddingLeft={5}>
                      <Text textAlign={'center'}>
                        {responseChatData?.length || 0} Bình luận
                      </Text>
                    </Box>
                    <TouchableOpacity style={{ padding: 5 }} onPress={onClose}>
                      <AntDesign name="close" size={sizes._20sdp} color={colors.black} />
                    </TouchableOpacity>
                  </Box>
                </Box>
                <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>
                    <Fragment>
                      {responseChatData && responseChatData
                        .filter(reply => reply.parent_comment_id === null)
                        .map((item: ResponeChatData, index: number) => {
                          const processedCommentIds = new Set();
                          return (
                            <Box key={index}>
                              <CommentCard
                                data={item}
                                handleReplyMessage={handleReplyClick}
                                receiveCommentId={receiveCommentId}
                              />
                              {responseChatData
                                .filter(reply => reply.parent_comment_id === item.comment_id)
                                .map((reply, replyIndex) => {
                                  if (!processedCommentIds.has(reply.comment_id)) {
                                    processedCommentIds.add(reply.comment_id);
                                    return (
                                      <Box key={`reply-${replyIndex}`}>
                                        <CommentCard
                                          data={reply}
                                          handleReplyMessage={handleReplyClick}
                                          receiveCommentId={receiveCommentId}
                                          isReply={true}
                                          replyToName={responseChatData.find(res => res.comment_id === reply.parent_comment_id)?.user_name || ''}
                                        />
                                        {responseChatData
                                          .filter(subReply => subReply.reply_to_comment_id === reply.comment_id)
                                          .map((subReply, subReplyIndex) => {
                                            if (!processedCommentIds.has(subReply.comment_id)) {
                                              processedCommentIds.add(subReply.comment_id);
                                              return (
                                                <CommentCard
                                                  key={`subReply-${subReplyIndex}`}
                                                  data={subReply}
                                                  handleReplyMessage={handleReplyClick}
                                                  receiveCommentId={receiveCommentId}
                                                  isReply={true}
                                                  replyToName={responseChatData.find(res => res.comment_id === subReply.reply_to_comment_id)?.user_name || ''}
                                                />
                                              );
                                            }
                                            return null;
                                          })}
                                      </Box>
                                    );
                                  }
                                  return null;
                                })}
                            </Box>
                          );
                        })}
                    </Fragment>
                    {loading && 
                      <LoadingBase size="large"/>
                     }
                </ScrollView>
                <Box
                  style={{
                    borderWidth: 1,
                    borderRadius: 9999,
                    padding: 8,
                    marginHorizontal: 5,
                    ...styles_c.row_between
                  }}>
                  <TextInput
                    ref={inputRef}
                    placeholder="Nhập bình luận"
                    value={inputText}
                    onChangeText={(text: string) => setInputText(text)}
                    style={{ width: '90%', paddingLeft: 5 }}
                  />
                  <TouchableOpacity
                    style={{ width: '10%', ...styles_c.col_center }}
                    disabled={disableButtonSendMessage}
                    onPress={sendMessage}>
                    <Box p={1}>
                      <Feather name="send" color={colors.blue_primary} size={sizes._20sdp} />
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: '80%',
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default memo(ModalChat);
