import React, { useEffect, useRef, useState } from 'react';
import * as S from './chat-styles';
import { useTranslation } from 'react-i18next';
import { isMobile } from '../../utils/utils';
import { store } from '../../store';
import { setDisplayChat } from '../../store/chat.store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { connect } from 'react-redux';
import { ExitButton } from '../exit-button/exit-button';

export type MessageType = {
  id: string;
  message: string;
};

function ChatComponent() {
  const dispatch = useAppDispatch();
  const displayChat = useAppSelector((state) => state.chat.displayChat);
  const userData = useAppSelector((state) => state.user.userData);

  const chatMessagesRef = useRef<any>(null);
  const { t } = useTranslation();
  const [mobileVersion, setMobileVersion] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const [messages, setMessages] = useState<MessageType[]>(
    Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i < 2 ? '123456A' : '123456B',
        message: `Random message, with a big chunk of text. Experimenting with this as we go along.`,
      })),
  );

  const closeChat = () => {
    console.log('Close');

    dispatch(setDisplayChat(false));
  };

  const inputChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const sendMessage = () => {
    setMessages([...messages, { id: '123456A', message: inputValue }]);
    setInputValue('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the new line in the input field
      sendMessage();
    }
  };

  // Scroll to the bottom when messages change, but only if the user is already at the bottom
  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
    }
  }, [messages, shouldScrollToBottom]);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  // Check if the user has scrolled up manually
  const handleScroll = () => {
    const isAtBottom =
      chatMessagesRef.current.scrollHeight -
        chatMessagesRef.current.scrollTop <=
      chatMessagesRef.current.clientHeight + 1; // Added a small buffer for potential floating point discrepancies
    setShouldScrollToBottom(isAtBottom);
  };

  useEffect(() => {
    setMobileVersion(isMobile());
    const handleResize = () => {
      setMobileVersion(isMobile());
    };
    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs once on mount

  return (
    <>
      {displayChat === true && (
        <S.Wrapper>
          {/* Adds a backdrop with blur in case it's mobile */}
          {mobileVersion && <S.Backdrop />}
          <S.Content>
            <S.TitleSection>
              <S.Title>{t('Chat Title')}</S.Title>
              {/* Add the icon when we have access to it */}
              {/* {mobileVersion && <S.ExitButton icon={''} />} */}
              {mobileVersion && (
                <ExitButton onClick={closeChat}>&#10005;</ExitButton>
              )}
            </S.TitleSection>
            <S.MessagesContainer onScroll={handleScroll} ref={chatMessagesRef}>
              {messages &&
                messages.length > 0 &&
                messages.map((message, index) => (
                  <S.MessageItemWrapper
                    key={index}
                    isOtherPlayer={userData?.id === message.id}
                  >
                    <S.MessageItem isOtherPlayer={userData?.id === message.id}>
                      {message.message}
                    </S.MessageItem>
                  </S.MessageItemWrapper>
                ))}
            </S.MessagesContainer>
            <S.InputWrapper>
              <S.Input
                onKeyDown={handleKeyDown}
                onSubmit={sendMessage}
                value={inputValue}
                onChange={inputChange}
                placeholder={t('Chat Input Placeholder')}
              ></S.Input>
              <S.SendButton onClick={sendMessage}>
                {t('Chat Send Button')}
              </S.SendButton>
            </S.InputWrapper>
          </S.Content>
        </S.Wrapper>
      )}
    </>
  );
}

export default ChatComponent;
