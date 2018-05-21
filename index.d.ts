import { Stats } from 'fs';

declare function relative(a: string, b: string, stat?: boolean | Stats): string;

declare namespace relative {
    function toBase(base: string, filepath: string): string;
}

export = relative;
