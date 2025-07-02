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

        if (isset($filters['guest'])) {
            $query->guest($filters['guest']);
        }

        if (isset($filters['checkin']) && isset($filters['checkout'])) {
            $checkin = $filters['checkin'];
            $checkout = $filters['checkout'];
            $query->whereDoesntHave('bookings', function ($q) use ($checkin, $checkout) {
                $q->where(function ($query) use ($checkin, $checkout) {
                    $query->where('checkin', '<', $checkout)
                        ->where('checkout', '>', $checkin);
                });
            });
        }

        if (
            isset($filters['sortColumn']) &&
            $filters['sortColumn'] === 'price'
        ) {
            $direction = $filters['sortOrder'] ?? 'asc';
            $query->sortByPrice($direction);
            unset($filters['sortColumn'], $filters['sortOrder']);
        }

        return $this->getAll($perPage, $query, $filters, $columnSearch, $termSearch);
    }

    public function getRoom(int $id): Room
    {
        return $this->getById($id);
    }
}
