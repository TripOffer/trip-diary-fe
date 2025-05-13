/**
 * 日记相关的 mock 数据
 */

export interface Tag {
  id: string;
  name: string;
}

export interface Author {
  id: string | number;
  name: string;
  avatar: string;
}

export interface DiaryItem {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  author: Author;
  isLiked?: boolean;
  isFavorite?: boolean;
  thumbnailMeta?: {
    width: number;
    height: number;
  };
  content?: string;
  images?: string[];
}

// 我的日记列表
export const mockMyDiaries: DiaryItem[] = [
  {
    id: '1',
    title: '福建武夷山三日游记',
    thumbnail: 'https://picsum.photos/800/600?random=1',
    viewCount: 320,
    likeCount: 42,
    favoriteCount: 15,
    commentCount: 8,
    publishedAt: '2023-05-01',
    updatedAt: '2023-05-01',
    tags: [
      { id: '1', name: '旅行' },
      { id: '2', name: '风景' },
    ],
    author: {
      id: '1',
      name: '梦辰',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isLiked: false,
    thumbnailMeta: {
      width: 800,
      height: 600,
    },
  },
  {
    id: '2',
    title: '杭州西湖一日游 - 体验江南水乡的诗意',
    thumbnail: 'https://picsum.photos/600/800?random=2',
    viewCount: 218,
    likeCount: 36,
    favoriteCount: 12,
    commentCount: 5,
    publishedAt: '2023-04-28',
    updatedAt: '2023-04-28',
    tags: [
      { id: '1', name: '旅行' },
      { id: '3', name: '美食' },
    ],
    author: {
      id: '1',
      name: '梦辰',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isLiked: true,
    thumbnailMeta: {
      width: 600,
      height: 800,
    },
  },
  {
    id: '3',
    title: '成都美食攻略 - 吃货必备指南',
    thumbnail: 'https://picsum.photos/750/500?random=3',
    viewCount: 456,
    likeCount: 89,
    favoriteCount: 24,
    commentCount: 15,
    publishedAt: '2023-04-15',
    updatedAt: '2023-04-15',
    tags: [
      { id: '3', name: '美食' },
      { id: '4', name: '攻略' },
    ],
    author: {
      id: '1',
      name: '梦辰',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isLiked: false,
    thumbnailMeta: {
      width: 750,
      height: 500,
    },
  },
  {
    id: '4',
    title: '冬季北海道滑雪体验',
    thumbnail: 'https://picsum.photos/900/600?random=4',
    viewCount: 302,
    likeCount: 67,
    favoriteCount: 19,
    commentCount: 11,
    publishedAt: '2023-03-20',
    updatedAt: '2023-03-20',
    tags: [
      { id: '1', name: '旅行' },
      { id: '5', name: '冬季' },
    ],
    author: {
      id: '1',
      name: '梦辰',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isLiked: false,
    thumbnailMeta: {
      width: 900,
      height: 600,
    },
  },
  {
    id: '5',
    title: '厦门环岛路骑行攻略',
    thumbnail: 'https://picsum.photos/800/800?random=5',
    viewCount: 189,
    likeCount: 38,
    favoriteCount: 14,
    commentCount: 7,
    publishedAt: '2023-03-05',
    updatedAt: '2023-03-05',
    tags: [
      { id: '1', name: '旅行' },
      { id: '6', name: '骑行' },
    ],
    author: {
      id: '1',
      name: '梦辰',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    isLiked: true,
    thumbnailMeta: {
      width: 800,
      height: 800,
    },
  },
];

// 收藏的日记列表
export const mockFavoriteDiaries: DiaryItem[] = [
  {
    id: '6',
    title: '大理古城徒步游记',
    thumbnail: 'https://picsum.photos/650/850?random=6',
    viewCount: 278,
    likeCount: 56,
    favoriteCount: 23,
    commentCount: 12,
    publishedAt: '2023-05-10',
    updatedAt: '2023-05-10',
    tags: [
      { id: '1', name: '旅行' },
      { id: '7', name: '古城' },
    ],
    author: {
      id: '2',
      name: '旅行家',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    isLiked: false,
    isFavorite: true,
    thumbnailMeta: {
      width: 650,
      height: 850,
    },
  },
  {
    id: '7',
    title: '张家界玻璃桥挑战记',
    thumbnail: 'https://picsum.photos/750/500?random=7',
    viewCount: 432,
    likeCount: 92,
    favoriteCount: 31,
    commentCount: 19,
    publishedAt: '2023-05-05',
    updatedAt: '2023-05-05',
    tags: [
      { id: '1', name: '旅行' },
      { id: '8', name: '极限' },
    ],
    author: {
      id: '3',
      name: '探险者',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    isLiked: true,
    isFavorite: true,
    thumbnailMeta: {
      width: 750,
      height: 500,
    },
  },
  {
    id: '8',
    title: '澳大利亚大堡礁潜水体验',
    thumbnail: 'https://picsum.photos/800/600?random=8',
    viewCount: 356,
    likeCount: 78,
    favoriteCount: 27,
    commentCount: 14,
    publishedAt: '2023-04-20',
    updatedAt: '2023-04-20',
    tags: [
      { id: '1', name: '旅行' },
      { id: '9', name: '潜水' },
    ],
    author: {
      id: '4',
      name: '水下摄影师',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    isLiked: false,
    isFavorite: true,
    thumbnailMeta: {
      width: 800,
      height: 600,
    },
  },
];

// 点赞的日记列表
export const mockLikedDiaries: DiaryItem[] = [
  {
    id: '9',
    title: '日本东京街头美食大搜罗',
    thumbnail: 'https://picsum.photos/700/900?random=9',
    viewCount: 512,
    likeCount: 134,
    favoriteCount: 45,
    commentCount: 23,
    publishedAt: '2023-05-15',
    updatedAt: '2023-05-15',
    tags: [
      { id: '3', name: '美食' },
      { id: '10', name: '日本' },
    ],
    author: {
      id: '5',
      name: '美食家',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    isLiked: true,
    thumbnailMeta: {
      width: 700,
      height: 900,
    },
  },
  {
    id: '10',
    title: '泰国清迈文化之旅',
    thumbnail: 'https://picsum.photos/850/550?random=10',
    viewCount: 298,
    likeCount: 63,
    favoriteCount: 21,
    commentCount: 10,
    publishedAt: '2023-04-25',
    updatedAt: '2023-04-25',
    tags: [
      { id: '1', name: '旅行' },
      { id: '11', name: '文化' },
    ],
    author: {
      id: '6',
      name: '文化探索者',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    isLiked: true,
    thumbnailMeta: {
      width: 850,
      height: 550,
    },
  },
];

// 生成更多的日记数据（用于加载更多功能）
export const generateMoreDiaries = (count: number = 5, baseId: number = 100): DiaryItem[] => {
  const diaries: DiaryItem[] = [];

  const titles = [
    '探索云南丽江古镇',
    '三亚海滩度假游记',
    '重庆火锅与洪崖洞一日游',
    '北京胡同深度游',
    '西藏布达拉宫朝圣之旅',
    '青海湖环湖骑行',
    '新疆喀纳斯风光',
    '黄山云海日出',
    '张家界玻璃栈道挑战',
    '九寨沟彩林之旅',
  ];

  for (let i = 0; i < count; i++) {
    const id = baseId + i;
    const width = 600 + Math.floor(Math.random() * 400);
    const height = 400 + Math.floor(Math.random() * 500);

    diaries.push({
      id: `${id}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      thumbnail: `https://picsum.photos/${width}/${height}?random=${id}`,
      viewCount: Math.floor(Math.random() * 500) + 100,
      likeCount: Math.floor(Math.random() * 100) + 10,
      favoriteCount: Math.floor(Math.random() * 50) + 5,
      commentCount: Math.floor(Math.random() * 30),
      publishedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
      tags: [
        {
          id: `${Math.floor(Math.random() * 5) + 1}`,
          name: ['旅行', '美食', '风景', '文化', '冒险'][Math.floor(Math.random() * 5)],
        },
        {
          id: `${Math.floor(Math.random() * 5) + 6}`,
          name: ['摄影', '徒步', '自驾', '古镇', '海滩'][Math.floor(Math.random() * 5)],
        },
      ],
      author: {
        id: Math.floor(Math.random() * 5) + 1,
        name: ['旅行者', '摄影师', '美食家', '探险者', '文化使者'][Math.floor(Math.random() * 5)],
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
      },
      isLiked: Math.random() > 0.5,
      isFavorite: Math.random() > 0.7,
      thumbnailMeta: {
        width,
        height,
      },
    });
  }

  return diaries;
};

// 模拟获取更多日记的API
export const mockFetchMoreDiaries = (
  type: 'my' | 'favorite' | 'liked',
  page: number = 1,
): Promise<DiaryItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 只有在页码大于1时才返回新数据
      if (page > 1) {
        resolve(generateMoreDiaries(5, page * 100));
      } else {
        // 返回对应类型的初始数据
        if (type === 'my') {
          resolve([...mockMyDiaries]);
        } else if (type === 'favorite') {
          resolve([...mockFavoriteDiaries]);
        } else {
          resolve([...mockLikedDiaries]);
        }
      }
    }, 800);
  });
};
