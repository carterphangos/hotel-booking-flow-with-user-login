@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Danh sách bài viết</h1>
        <form method="POST" action="{{ route('posts.store') }}">
            @csrf
            <h3>Tạo bài viết mới</h3>
            <div class="form-group">
                <label for="title">Tiêu đề</label>
                <input type="text" class="form-control" id="title" name="title" placeholder="Tiêu đề của bài viết"
                    required>
            </div>

            <div class="form-group">
                <label for="content">Nội dung</label>
                <textarea class="form-control" id="content" name="content" rows="3" placeholder="Bạn đang nghĩ gì" required></textarea>
            </div>

            <button type="submit" class="mt-3 btn btn-primary">Tạo</button>
        </form>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Nội dung</th>
                    <th>Tác giả</th>
                    <th>Ngày tạo</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($posts as $post)
                    <tr>
                        <td>{{ $post->id }}</td>
                        <td><a href="{{ route('posts.show', $post->id) }}">{{ $post->title }}</a></td>
                        <td>{{ $post->content }}</td>
                        <td>{{ $post->user->name }}</td>
                        <td>{{ $post->created_at }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        {{ $posts->withQueryString()->links() }}
    </div>
@endsection
