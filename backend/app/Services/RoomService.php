<?php

namespace App\Services;

use App\Models\Room;

class RoomService extends BaseService
{
    public function __construct(Room $room)
    {
        parent::__construct($room);
    }

    public function getAllRooms($params = [])
    {
        $perPage = $params['perPage'] ?? 10;
        $filters = $params['filters'] ?? [];
        $columnSearch = $params['columnSearch'] ?? null;
        $termSearch = $params['termSearch'] ?? null;
        $query = $this->model->newQuery();
        return $this->getAll($perPage, $query, $filters, $columnSearch, $termSearch);
    }

    public function getRoom(int $id): Room
    {
        return $this->getById($id);
    }
}
