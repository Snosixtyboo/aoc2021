use std::collections::{HashMap, HashSet};

struct Instruction {
    axis: usize,
    value: usize,
}

fn parse_input(lines: &Vec<&str>) -> (Vec<([usize; 2])>, Vec<Instruction>) {
    let mut instructions = Vec::<Instruction>::new();
    let mut points = Vec::<[usize; 2]>::new();

    for line in lines {
        let comp: Vec<&str> = line.split(",").collect();
        if comp.len() == 2 {
            let p = [
                comp[0].parse::<usize>().unwrap(),
                comp[1].parse::<usize>().unwrap(),
            ];
            points.push(p);
        } else {
            let comp: Vec<&str> = line.split("=").collect();
            if comp.len() == 2 {
                let axis = if comp[0].ends_with("x") { 0 } else { 1 };
                let value = comp[1].parse::<usize>().unwrap();
                instructions.push(Instruction { axis, value })
            }
        }
    }
    return (points, instructions);
}

fn part1(input: &str) -> String {
    let lines = input.split("\n").collect::<Vec<&str>>();
    let (points, instructions) = parse_input(&lines);

    let mut folded_points = HashSet::<[usize; 2]>::new();
    for point in &points {
        let mut folded = *point;

        let inst = instructions.first().unwrap();
        if folded[inst.axis] > inst.value {
            folded[inst.axis] -= 2 * (folded[inst.axis] - inst.value);
        }
        folded_points.insert(folded);
    }

    let result = folded_points.len();
    return result.to_string();
}

fn part2(input: &str) -> String {
    let lines = input.split("\n").collect::<Vec<&str>>();
    let (points, instructions) = parse_input(&lines);

    let mut pattern = vec![vec!['.'; 5 * 8]; 6];
    for point in &points {
        let mut folded = *point;

        for inst in &instructions {
            if folded[inst.axis] > inst.value {
                folded[inst.axis] -= 2 * (folded[inst.axis] - inst.value);
            }
        }
        pattern[folded[1]][folded[0]] = '#'
    }

    let result = decode_ascii(&pattern, 8, 0, 0);
    return result;
}
// EOC

fn decode_ascii(ascii: &Vec<Vec<char>>, num: usize, yoff: usize, xoff: usize) -> String {
    let alphabet_6 = HashMap::from([
        (".##.\n#..#\n#..#\n####\n#..#\n#..#\n".to_string(), 'A'),
        ("###.\n#..#\n###.\n#..#\n#..#\n###.\n".to_string(), 'B'),
        (".##.\n#..#\n#...\n#...\n#..#\n.##.\n".to_string(), 'C'),
        ("####\n#...\n###.\n#...\n#...\n####\n".to_string(), 'E'),
        ("####\n#...\n###.\n#...\n#...\n#...\n".to_string(), 'F'),
        (".##.\n#..#\n#...\n#.##\n#..#\n.###\n".to_string(), 'G'),
        ("#..#\n#..#\n####\n#..#\n#..#\n#..#\n".to_string(), 'H'),
        (".###\n..#.\n..#.\n..#.\n..#.\n.###\n".to_string(), 'I'),
        ("..##\n...#\n...#\n...#\n#..#\n.##.\n".to_string(), 'J'),
        ("#..#\n#.#.\n##..\n#.#.\n#.#.\n#..#\n".to_string(), 'K'),
        ("#...\n#...\n#...\n#...\n#...\n####\n".to_string(), 'L'),
        (".##.\n#..#\n#..#\n#..#\n#..#\n.##.\n".to_string(), 'O'),
        ("###.\n#..#\n#..#\n###.\n#...\n#...\n".to_string(), 'P'),
        ("###.\n#..#\n#..#\n###.\n#.#.\n#..#\n".to_string(), 'R'),
        (".###\n#...\n#...\n.##.\n...#\n###.\n".to_string(), 'S'),
        ("#..#\n#..#\n#..#\n#..#\n#..#\n.##.\n".to_string(), 'U'),
        ("#...\n#...\n.#.#\n..#.\n..#.\n..#.\n".to_string(), 'Y'),
        ("####\n...#\n..#.\n.#..\n#...\n####\n".to_string(), 'Z'),
    ]);

    let mut decoded = String::new();
    for i in 0..num {
        let mut test = String::new();
        for y in yoff..yoff + 6 {
            for x in xoff + i * 5..xoff + i * 5 + 4 {
                test.push(ascii[y][x]);
            }
            test.push('\n');
        }
        let c: char;
        let res = alphabet_6.get(&test);
        if res.is_none() {
            for row in ascii {
                println!("{}", row.into_iter().collect::<String>());
            }
            return "No clue, check console!".to_string();
        } else {
            c = res.unwrap().clone();
        }
        decoded.push(c);
    }
    return decoded;
}

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
    let s = "asdf";
    println!(
        "{}",
        solve_part2(String::from(
            "6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5",
        ))
    );
}
