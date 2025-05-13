import BaseApi from '../shared';
import {
  CommentListQuery,
  CommentListRes,
  CreateCommentReq,
  CreateCommentRes,
  CreateDiaryReq,
  CreateDiaryRes,
  DeleteCommentRes,
  DeleteDiaryRes,
  DiaryDetailRes,
  DiaryListQuery,
  DiaryListRes,
  FavoriteDiaryRes,
  LikeCommentRes,
  LikeDiaryRes,
  PublishDiaryRes,
  RecommendDiaryRes,
  ReplyListQuery,
  ReplyListRes,
  ReviewDiaryReq,
  ReviewDiaryRes,
  ReviewListRes,
  SearchDiaryQuery,
  SearchDiaryRes,
  UnfavoriteDiaryRes,
  UnlikeCommentRes,
  UnlikeDiaryRes,
  UpdateDiaryReq,
  UpdateDiaryRes,
} from './types';

class DiaryApi extends BaseApi {
  urls = {
    myList: '/diary/my-list',
    userList: (userId: number) => `/diary/user/${userId}/list`,
    favoriteList: '/diary/favorite-list',
    detail: (id: string | number) => `/diary/${id}/detail`,
    create: '/diary',
    update: '/diary',
    delete: (id: number) => `/diary/${id}`,
    publish: (id: number) => `/diary/${id}/publish`,
    review: (id: number) => `/diary/${id}/review`,
    reviewList: '/diary/review-list',
    like: (id: string) => `/diary/${id}/like`,
    unlike: (id: string) => `/diary/${id}/like`,
    favorite: (id: string | number) => `/diary/${id}/favorite`,
    unfavorite: (id: string | number) => `/diary/${id}/favorite`,
    comment: '/diary/comment',
    commentList: (diaryId: number) => `/diary/${diaryId}/comments`,
    replyList: (commentId: number) => `/diary/comment/${commentId}/replies`,
    likeComment: (id: number) => `/diary/comment/${id}/like`,
    unlikeComment: (id: number) => `/diary/comment/${id}/unlike`,
    search: '/diary/search',
    recommend: '/diary/recommend',
  };

  tag = 'Diary';

  async getMyDiaries(params: DiaryListQuery) {
    return this.http.get<DiaryListRes>(this.urls.myList, { params });
  }

  async getUserDiaries(userId: number, params: DiaryListQuery) {
    return this.http.get<DiaryListRes>(this.urls.userList(userId), { params });
  }

  async getFavoriteDiaries(params: DiaryListQuery) {
    return this.http.get<DiaryListRes>(this.urls.favoriteList, { params });
  }

  async getDiaryDetail(id: string | number) {
    return this.http.get<DiaryDetailRes>(this.urls.detail(id));
  }

  async createDiary(data: CreateDiaryReq) {
    return this.http.post<CreateDiaryRes>(this.urls.create, data);
  }

  async updateDiary(data: UpdateDiaryReq) {
    return this.http.put<UpdateDiaryRes>(this.urls.update, data);
  }

  async deleteDiary(id: number) {
    return this.http.delete<DeleteDiaryRes>(this.urls.delete(id));
  }

  async publishDiary(id: number, published: boolean) {
    return this.http.put<PublishDiaryRes>(this.urls.publish(id), { published });
  }

  async reviewDiary(id: number, data: ReviewDiaryReq) {
    return this.http.put<ReviewDiaryRes>(this.urls.review(id), data);
  }

  async getReviewList(params: DiaryListQuery) {
    return this.http.get<ReviewListRes>(this.urls.reviewList, { params });
  }

  async likeDiary(id: string) {
    return this.http.post<LikeDiaryRes>(this.urls.like(id));
  }

  async unlikeDiary(id: string) {
    return this.http.delete<UnlikeDiaryRes>(this.urls.unlike(id));
  }

  async favoriteDiary(id: string | number) {
    return this.http.post<FavoriteDiaryRes>(this.urls.favorite(id));
  }

  async unfavoriteDiary(id: string | number) {
    return this.http.delete<UnfavoriteDiaryRes>(this.urls.unfavorite(id));
  }

  async createComment(data: CreateCommentReq) {
    return this.http.post<CreateCommentRes>(this.urls.comment, data);
  }

  async deleteComment(id: number) {
    return this.http.delete<DeleteCommentRes>(`${this.urls.comment}/${id}`);
  }

  async getComments(diaryId: number, params: CommentListQuery) {
    return this.http.get<CommentListRes>(this.urls.commentList(diaryId), { params });
  }

  async getReplies(commentId: number, params: ReplyListQuery) {
    return this.http.get<ReplyListRes>(this.urls.replyList(commentId), { params });
  }

  async likeComment(id: number) {
    return this.http.post<LikeCommentRes>(this.urls.likeComment(id));
  }

  async unlikeComment(id: number) {
    return this.http.post<UnlikeCommentRes>(this.urls.unlikeComment(id));
  }

  async searchDiaries(params: SearchDiaryQuery) {
    return this.http.get<SearchDiaryRes>(this.urls.search, { params });
  }

  async getRecommendDiaries(params: DiaryListQuery) {
    return this.http.get<RecommendDiaryRes>(this.urls.recommend, { params });
  }
}

export const diaryApi = new DiaryApi();
