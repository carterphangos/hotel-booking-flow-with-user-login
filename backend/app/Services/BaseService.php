<?php

namespace App\Services;

use App\Enums\BaseColumn;
use App\Enums\BaseSort;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Gate;

class BaseService
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function getAll($perPage, $query, $filters = [], $columnSearch = null, $termSearch = null): Paginator
    {
        $sortColumn = $filters['sortColumn'] ?? BaseColumn::COLUMN_CREATED;
        $sortOrder = $filters['sortOrder'] ?? BaseSort::ORDER_DESC;

        $query->orderBy($sortColumn, $sortOrder);

        if ($termSearch && is_array($columnSearch)) {
            $query->where(function ($subQuery) use ($columnSearch, $termSearch) {
                foreach ($columnSearch as $column) {
                    $subQuery->orWhere($column, 'like', "%$termSearch%");
                }
            });
        }

        return $query->paginate($perPage);
    }

    public function getById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $model = $this->model->findOrFail($id);

        Gate::authorize('update', $model);

        $model->update($data);

        return $model;
    }

    public function delete($id)
    {
        $model = $this->model->findOrFail($id);

        Gate::authorize('delete', $model);

        $model->delete();

        return $model;
    }
}
