import { User } from "@app/user/decorators/user.decorator";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { UserEntity } from "@app/user/user.entity";
import { Body, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { Controller, Post } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(@User('id') currentUserId: number, @Query() query: any): 
    Promise<ArticlesResponseInterface> {
      return await this.articleService.findAll(currentUserId, query)
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @User() currentUser: UserEntity, 
        @Body('article') createArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(
            currentUser, 
            createArticleDto,
        );
        return this.articleService.buildArticleResponse(article);
    } 

    @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

}