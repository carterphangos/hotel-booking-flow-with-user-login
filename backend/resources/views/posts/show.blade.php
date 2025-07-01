@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $post->title }}</h1>
        <p>{{ $post->content }}</p>
        <p>Tác giả: {{ $post->user->name }}</p>
        <p>Ngày tạo: {{ $post->created_at->format('d/m/Y') }}</p>

        <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-primary">Chỉnh sửa</a>
        <form action="{{ route('posts.destroy', $post->id) }}" method="POST" style="display: inline-block;">
            @csrf
            @method('DELETE')
            <button type="submit" class="btn btn-danger">Xóa</button>
        </form>

        <h3>Bình luận</h3>
        <div id="comments">
            @foreach ($post->comments as $comment)
                <div class="comment" id="comment-{{ $comment->id }}">
                    @if ($comment->isEditing ?? false)
                        <form action="{{ route('comments.update', $comment->id) }}" method="POST"
                            class="comment-edit-form">
                            @csrf
                            @method('PUT')
                            <div class="form-group">
                                <textarea class="form-control" name="content" rows="3" required>{{ $comment->content }}</textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">Lưu</button>
                            <a href="#" class="btn btn-secondary btn-sm cancel-edit">Hủy</a>
                        </form>
                    @else
                        <p><strong>{{ $comment->user->name }}</strong> - {{ $comment->created_at->format('d/m/Y') }}</p>
                        <p>{{ $comment->content }}</p>
                        <div class="comment-actions">
                            <a href="#" class="btn btn-primary btn-sm edit-comment"
                                data-comment-id="{{ $comment->id }}">Sửa</a>
                            <form action="{{ route('comments.destroy', $comment->id) }}" method="POST"
                                style="display: inline-block;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">Xóa</button>
                            </form> 
                        </div>
                    @endif
                </div>  
            @endforeach
        </div>

        <h3>Thêm bình luận</h3>
        <form action="{{ route('comments.store', $post->id) }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="content">Nội dung</label>
                <textarea class="form-control" id="content" name="content" rows="3" required></textarea>
                <input type="hidden" name="post_id" value={{ $post->id }}>
            </div>
            <button type="submit" class="mt-3 btn btn-primary">Gửi</button>
        </form>
    </div>


    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var editCommentLinks = document.querySelectorAll('.edit-comment');
            editCommentLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var commentId = this.dataset.commentId;
                    var commentElement = document.getElementById('comment-' + commentId);
                    commentElement.querySelector('.comment-edit-form').style.display = 'block';
                    this.parentNode.style.display = 'none';
                });
            });

            var cancelEditLinks = document.querySelectorAll('.cancel-edit');
            cancelEditLinks.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var commentElement = this.closest('.comment');
                    commentElement.querySelector('.comment-edit-form').style.display = 'none';
                    commentElement.querySelector('.comment-actions').style.display = 'block';
                });
            });
        });
    </script>
@endsection
