@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Danh sách bình luận</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tiêu đề bài post</th>
                    <th>Tác giả</th>
                    <th>Nội dung</th>
                    <th>Ngày tạo</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($comments as $comment)
                    <tr>
                        <td>{{ $comment->id }}</td>
                        <td>{{ $comment->post->title }}</td>
                        <td>{{ $comment->user->name }}</td>
                        <td>{{ $comment->content }}</td>
                        <td>{{ $comment->created_at }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        {{ $comments->withQueryString()->links() }}
    </div>
@endsection
