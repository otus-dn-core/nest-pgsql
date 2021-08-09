import { UserEntity } from "@app/user/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { ArticleEntity } from "./article.entity";
import { CreateArticleDto } from "./dto/createArticle.dto";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import slugify from "slugify";
import { ArticlesResponseInterface } from "./types/articlesResponse.interface";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity) 
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}

    async findAll(currentUserId: number, query: any): Promise<ArticlesResponseInterface> {
        const queryBuilder = getRepository(ArticleEntity)
        .createQueryBuilder('articles')
        .leftJoinAndSelect('articles.author', 'author');

        const articles = await queryBuilder.getMany();
        const articlesCount = await queryBuilder.getCount();

        return {articles, articlesCount};
    }

    async createArticle(
        currentUser: UserEntity, 
        createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity> {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);

        if (!article.tagList) {
            article.tagList = [];
        }

        article.slug = this.getSlug(createArticleDto.title);

        article.author = currentUser; // TypeORM сам возмёт id пользователя

        return await this.articleRepository.save(article);
    }


    async deleteArticle(
        slug: string,
        currentUserId: number,
      ): Promise<DeleteResult> {
        const article = await this.findBySlug(slug);
    
        if (!article) {
          throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }
    
        if (article.author.id !== currentUserId) {
          throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }
    
        return await this.articleRepository.delete({ slug });
      }


    async findBySlug(slug: string): Promise<ArticleEntity> {
        return await this.articleRepository.findOne({ slug });
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article };
    }

    private getSlug(title: string): string {
        return (
          slugify(title, { lower: true }) +
          '-' +
          ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
        );
    }
}