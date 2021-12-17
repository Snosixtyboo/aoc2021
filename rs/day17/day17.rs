#[macro_use]
extern crate scan_fmt;

fn vel_to_d(n: i32) -> i32 {
    (n * n + n) / 2
}

fn d_to_vel(d: i32) -> f64 {
    (((d * 8 + 1) as f64).sqrt() - 1f64) / 2f64
}

fn list_all_shots(x: (i32, i32), y: (i32, i32)) -> HashSet<(i32, i32)> {
    let vel_x_rest = (d_to_vel(x.0).ceil() as i32, d_to_vel(x.1).floor() as i32);
    let mut vel_x_for_t = HashMap::<i32, Vec<i32>>::new();

    for vel in vel_x_rest.0..=x.1 {
        let d_vel_0 = vel_to_d(vel);
        let t_right = vel - d_to_vel(d_vel_0 - x.1).ceil() as i32;
        let t_left = vel - d_to_vel(d_vel_0 - x.0).floor() as i32;
        for t in t_left..=t_right {
            vel_x_for_t.entry(t).or_insert(Vec::<i32>::new()).push(vel);
        }
    }

    let mut vel_set = HashSet::<(i32, i32)>::new();
    for v in 0..-y.0 {
        let d_vel_0 = vel_to_d(v);
        let t_top = d_to_vel(d_vel_0 - y.1).ceil() as i32 - v;
        let t_bottom = d_to_vel(d_vel_0 - y.0).floor() as i32 - v;
        let t_top_ = t_top + 2 * v + 1;
        let t_bottom_ = t_bottom + 2 * v + 1;

        for r in [(t_top, t_bottom, -1, -1), (t_top_, t_bottom_, 1, 0)] {
            for t in r.0..=r.1 {
                for d in vel_x_rest.0..=vel_x_rest.1 {
                    if t >= d {
                        vel_set.insert((d, r.2 * v + r.3));
                    }
                }
                if vel_x_for_t.contains_key(&t) {
                    for w in vel_x_for_t.get(&t).unwrap() {
                        vel_set.insert((*w, r.2 * v + r.3));
                    }
                }
            }
        }
    }
    return vel_set;
}

fn read_input(input: &str) -> (i32, i32, i32, i32) {
    scan_fmt!(input, "target area: x={}..{}, y={}..{}", i32, i32, i32, i32).expect("Failed parsing")
}

fn part1(input: &str) -> String {
    let (xmin, xmax, ymin, ymax) = read_input(input);
    let list = list_all_shots((xmin, xmax), (ymin, ymax));
    let max_y = list.iter().max_by(|x, y| x.1.cmp(&y.1)).unwrap().1;
    let result = (max_y * max_y + max_y) / 2;
    return result.to_string();
}

fn part2(input: &str) -> String {
    let (xmin, xmax, ymin, ymax) = read_input(input);
    let result = list_all_shots((xmin, xmax), (ymin, ymax)).len();
    return result.to_string();
}
// EOC

use std::collections::{HashMap, HashSet};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn solve_part2(input: String) -> String {
    return part2(&input);
}

#[wasm_bindgen]
pub fn solve_part1(input: String) -> String {
    return part1(&input);
}

fn main() {
    println!(
        "{}",
        solve_part1(String::from("target area: x=14..50, y=-267..-225"))
    );
}
