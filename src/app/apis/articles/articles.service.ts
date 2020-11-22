import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleListConfig } from 'app/home/home.component';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleModel } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private httpClient: HttpClient) {}

  getListArticle(
    parameter: ArticleListConfig
  ): Observable<ArticleModel.Article[]> {
    let params = {};
    const keys = Object.keys(parameter.filters);
    if (keys.length > 0) {
      keys.forEach((key) => {
        params = new HttpParams().set(key, parameter.filters[key]);
      });
    }
    return this.httpClient
      .get<ArticleModel.Article[]>(`${environment.api_url}/articles`, {
        params,
      })
      .pipe(map((data: any) => data.articles));
  }

  getFeedArticles(): Observable<ArticleModel.Article[]> {
    return this.httpClient
      .get<ArticleModel.Article[]>(`${environment.api_url}/articles/feed`)
      .pipe(map((data: any) => data.articles));
  }

  getSingleArticle(slug: string): Observable<ArticleModel.Article> {
    return this.httpClient
      .get<ArticleModel.Article>(`${environment.api_url}/articles/${slug}`)
      .pipe(map((data: any) => data.articles));
  }

  createArticle(body): Observable<ArticleModel.Article> {
    return this.httpClient
      .post<ArticleModel.Article>(`${environment.api_url}/articles`, body)
      .pipe(map((data: any) => data.articles));
  }

  updateArticle(slug: string, body): Observable<ArticleModel.Article> {
    return this.httpClient
      .put<ArticleModel.Article>(
        `${environment.api_url}/articles/${slug}`,
        body
      )
      .pipe(map((data: any) => data.articles));
  }

  deleteArtilce(slug: string): Observable<unknown> {
    return this.httpClient.delete(`${environment.api_url}/articles/${slug}`);
  }

  favorite(slug: string): Observable<ArticleModel.Article> {
    return this.httpClient.post<ArticleModel.Article>(
      `${environment.api_url}/articles/${slug}/favorite`,
      {}
    );
  }

  unfavorite(slug: string): Observable<ArticleModel.Article> {
    return this.httpClient.delete<ArticleModel.Article>(
      `${environment.api_url}/articles/${slug}/favorite`
    );
  }
}