fn part1() -> String {
    let v: u64 = 42;
    return v.to_string();
}

fn part2() -> String {
    let w: u64 = 32;
    return w.to_string();
}
// EOC

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_part2() -> String {
    return part2();
}

#[wasm_bindgen]
pub fn solve_part1() -> String {
    return part1();
}

fn main() {}
