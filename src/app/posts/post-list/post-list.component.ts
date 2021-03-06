import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'aaaaa' },
  //   { title: 'Second Post', content: 'bbbbb' },
  //   { title: 'Third Post', content: 'ccccc' }
  // ];
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onPostDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
