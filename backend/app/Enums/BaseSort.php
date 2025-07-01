<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class BaseSort extends Enum
{
    const ORDER_ASC = 'asc';

    const ORDER_DESC = 'desc';
}
