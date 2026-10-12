export class KasirParamsDto {
  member!: string;
}

export class KasirQueryDto {
  metode?: string;
}

export class KasirItemDto {
  nama!: string;
  harga!: number;
  qty!: number;
}

export class HitungKasirDto {
  items!: KasirItemDto[];
}
