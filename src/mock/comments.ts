export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

// Mock头像列表
const mockAvatars = [
  'https://joeschmoe.io/api/v1/random',
  'https://joeschmoe.io/api/v1/male/random',
  'https://joeschmoe.io/api/v1/female/random',
];

// Mock用户名列表
const mockNames = [
  '旅行者458',
  '攀登者',
  '猫咪爱好者',
  '厦门小吃达人',
  '环球旅行家',
  '福建探险家',
  '流浪的诗人',
  '城市记录者',
  '美食家',
];

// Mock评论内容列表
const mockContents = [
  '太美了，我也想去！',
  '请问这是在哪里拍的呀？',
  '我上个月也去了，感觉超棒！',
  '这家店的东西好吃吗？',
  '请问住宿怎么样？方便吗？',
  '风景真美，点赞！',
  '拍得真好，用什么相机啊？',
  '谢谢分享，收藏了！',
  '这个季节去正合适，不冷不热。',
  '哇，这个角度拍得太赞了！',
];

/**
 * 生成模拟评论数据
 * @param count 生成评论的数量
 * @param existingComments 已存在的评论列表（用于确保ID不重复）
 * @returns 生成的评论数组
 */
export const generateMockComments = (
  count: number,
  existingComments: Comment[] = [],
): Comment[] => {
  const baseTime = new Date();
  const temp: Comment[] = [];

  for (let i = 0; i < count; i++) {
    const commentDate = new Date(baseTime);
    commentDate.setMinutes(baseTime.getMinutes() - i * 5);

    temp.push({
      id: `comment-${existingComments.length + i}`,
      authorId: `user-${Math.floor(Math.random() * 1000)}`,
      authorName: mockNames[Math.floor(Math.random() * mockNames.length)],
      authorAvatar: mockAvatars[Math.floor(Math.random() * mockAvatars.length)],
      content: mockContents[Math.floor(Math.random() * mockContents.length)],
      createdAt: commentDate.toLocaleString('zh-CN', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      likeCount: Math.floor(Math.random() * 100),
      isLiked: Math.random() > 0.7,
    });
  }

  return temp;
};

/**
 * 模拟获取评论的API
 * @param page 页码
 * @param pageSize 每页数量
 * @returns 评论数据和总数
 */
export const mockFetchComments = (
  page = 1,
  pageSize = 10,
): Promise<{ comments: Comment[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 56; // 模拟总评论数
      const comments = generateMockComments(pageSize);
      resolve({ comments, total });
    }, 800);
  });
};
