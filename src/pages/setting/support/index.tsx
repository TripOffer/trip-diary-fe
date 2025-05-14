import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button, Input, Tag } from 'tdesign-mobile-react';
import styles from './index.module.scss';

// 消息类型
interface ChatMessage {
  id: number;
  sender: 'user' | 'support';
  content: string;
  time: string;
  displayContent?: string;
  isTyping?: boolean;
}

// 常见问题
const faqQuestions = [
  '如何发布新的旅行日记？',
  '如何修改我的个人信息？',
  '如何关注其他用户？',
  '如何删除我的账号？',
  '隐私政策在哪里？',
];

// 预设回答
const faqAnswers: Record<string, string> = {
  '如何发布新的旅行日记？':
    '点击底部导航栏的"发布"按钮，然后填写日记内容、上传照片，最后点击"发布"即可分享你的旅行体验。',
  '如何修改我的个人信息？':
    '进入"我的"页面，点击个人资料卡片，然后点击"编辑个人资料"按钮，即可修改您的头像、昵称和个人简介等信息。',
  '如何关注其他用户？':
    '访问其他用户的个人页面，点击"关注"按钮即可。您也可以通过搜索功能查找感兴趣的用户。',
  '如何删除我的账号？':
    '请联系客服申请账号删除，我们会在验证您的身份后为您处理。账号删除后，所有数据将无法恢复，请谨慎操作。',
  '隐私政策在哪里？':
    '您可以在设置页面底部找到"隐私政策"链接，点击即可查看详细内容。我们非常重视用户隐私保护。',
};

// 获取当前时间字符串
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

const SupportChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 打字机效果定时器
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化客服消息
  useEffect(() => {
    // 模拟初始客服消息
    const initialMessages: ChatMessage[] = [
      {
        id: 1,
        sender: 'support',
        content: '您好，欢迎使用旅行日记客服，请问有什么可以帮助您的？',
        time: getCurrentTime(),
        displayContent: '',
        isTyping: true,
      },
    ];
    setMessages(initialMessages);

    // 模拟第一条消息的打字效果
    startTypingEffect(0);
  }, []);

  // 滚动到最新消息
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, []);

  // 打字机效果函数
  const startTypingEffect = (messageIndex: number) => {
    const speed = 50; // 打字速度（毫秒/字符）
    let charIndex = 0;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = setInterval(() => {
      setMessages((prevMessages) => {
        // 检查消息是否存在
        if (!prevMessages[messageIndex] || !prevMessages[messageIndex].isTyping) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          return prevMessages;
        }

        const message = prevMessages[messageIndex];
        const fullContent = message.content;
        charIndex++;

        // 打字完成
        if (charIndex >= fullContent.length) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);

          // 如果是第一条消息完成后，显示第二条欢迎消息
          if (messageIndex === 0) {
            setTimeout(() => {
              const secondMessage: ChatMessage = {
                id: 2,
                sender: 'support',
                content: '您可以选择下方的常见问题，或直接输入您的问题，我们会尽快为您解答。',
                time: getCurrentTime(),
                displayContent: '',
                isTyping: true,
              };
              setMessages((prev) => [...prev, secondMessage]);
              startTypingEffect(1);
            }, 300);
          }

          const updatedMessages = [...prevMessages];
          updatedMessages[messageIndex] = {
            ...message,
            displayContent: fullContent,
            isTyping: false,
          };
          return updatedMessages;
        }

        // 继续打字
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = {
          ...message,
          displayContent: fullContent.substring(0, charIndex),
        };
        return updatedMessages;
      });
    }, speed);
  };

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理发送消息
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputText,
      time: getCurrentTime(),
    };
    setMessages([...messages, userMessage]);
    setInputText('');

    // 模拟客服回复
    setTimeout(() => {
      // 检查是否是常见问题
      const answer =
        faqAnswers[inputText] ||
        '感谢您的咨询。我们的客服人员会尽快回复您的问题，请耐心等待。您也可以尝试选择下方的常见问题获取即时回答。';

      const supportMessage: ChatMessage = {
        id: messages.length + 2,
        sender: 'support',
        content: answer,
        time: getCurrentTime(),
        displayContent: '',
        isTyping: true,
      };

      setMessages((prev) => [...prev, supportMessage]);

      // 开始打字效果，对最后一条消息
      startTypingEffect(messages.length + 1);
    }, 800);
  };

  // 处理常见问题点击
  const handleFaqClick = (question: string) => {
    // 添加用户问题
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: question,
      time: getCurrentTime(),
    };
    setMessages([...messages, userMessage]);

    // 模拟客服回答
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: messages.length + 2,
        sender: 'support',
        content: faqAnswers[question],
        time: getCurrentTime(),
        displayContent: '',
        isTyping: true,
      };

      setMessages((prev) => [...prev, supportMessage]);

      // 开始打字效果，对最后一条消息
      startTypingEffect(messages.length + 1);
    }, 800);
  };

  // 处理键盘事件
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const SupportAvatar = () => (
    <div className={styles.supportAvatarWrapper}>
      <Icon icon="mdi:headset" width="20" height="20" color="#ffffff" />
    </div>
  );

  return (
    <div className={styles.supportChatPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleBack}>
          <Icon icon="mdi:arrow-left" />
        </div>
        <h1 className={styles.title}>帮助与客服</h1>
        <div className={styles.dummySpace}></div>
      </div>

      {/* 聊天内容区域 */}
      <div className={styles.chatContainer}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageItem} ${
              msg.sender === 'user' ? styles.userMessage : styles.supportMessage
            }`}
          >
            {msg.sender === 'support' && (
              <div className={styles.avatar}>
                <SupportAvatar />
              </div>
            )}
            <div className={styles.messageContent}>
              <div className={styles.messageBubble}>
                {msg.sender === 'support' && msg.isTyping !== undefined ? (
                  <>
                    {msg.displayContent || ''}
                    {msg.isTyping && <span className={styles.cursor}>|</span>}
                  </>
                ) : (
                  msg.content
                )}
              </div>
              <div className={styles.messageTime}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 常见问题区域 */}
      <div className={styles.faqSection}>
        <div className={styles.faqTitle}>常见问题</div>
        <div className={styles.faqTags}>
          {faqQuestions.map((question, index) => (
            <Tag key={index} className={styles.faqTag} onClick={() => handleFaqClick(question)}>
              {question}
            </Tag>
          ))}
        </div>
      </div>

      {/* 消息输入区域 */}
      <div className={styles.inputArea}>
        <div onKeyDown={handleKeyPress}>
          <Input
            value={inputText}
            onChange={(value) => setInputText(value as string)}
            placeholder="请输入您的问题..."
            className={styles.chatInput}
          />
        </div>
        <Button
          icon={<Icon icon="mdi:send" />}
          shape="round"
          size="small"
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className={styles.sendButton}
        />
      </div>
    </div>
  );
};

export default SupportChatPage;
