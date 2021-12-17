use ndarray::{Array1, Array2};

fn matrix_exp(matrix: &Array2<u128>, iterations: u128) -> Array2<u128> {
    let mut e = matrix.clone();
    let mut m = matrix.clone();
    let mut n = iterations - 1;
    while n > 0 {
        if n % 2 == 1 {
            m = m.dot(&e);
        }
        e = e.dot(&e);
        n >>= 1;
    }
    return m;
}

type Element = char;
type Pair = (Element, Element);
struct Rule {
    from: Pair,
    to: Element,
}

fn min_max_diff(iterations: u128, template: &str, rule_text: &str) -> u128 {
    let template = template.chars().collect::<Vec<char>>();
    let rules = rule_text
        .lines()
        .map(|line| {
            let mut l = line.chars();
            Rule {
                from: (l.next().unwrap(), l.next().unwrap()),
                to: l.nth(4).unwrap(),
            }
        })
        .collect::<Vec<Rule>>();

    let rule_index = rules
        .iter()
        .enumerate()
        .map(|(i, x)| (x.from, i))
        .collect::<HashMap<Pair, usize>>();

    let mut matrix = Array2::<u128>::zeros((rules.len(), rules.len()));
    for rule in &rules {
        matrix[[rule_index[&(rule.from.0, rule.to)], rule_index[&rule.from]]] = 1;
        matrix[[rule_index[&(rule.to, rule.from.1)], rule_index[&rule.from]]] = 1;
    }

    let mut v = Array1::<u128>::zeros(rules.len());
    for i in 0..template.len() - 1 {
        v[rule_index[&(template[i], template[i + 1])]] += 1;
    }
    v = matrix_exp(&matrix, iterations).dot(&v);

    let mut elem_count = HashMap::<Element, u128>::from([(*template.last().unwrap(), 1)]);
    for (i, count) in v.iter().enumerate() {
        *elem_count.entry(rules[i].from.0).or_insert(0) += count;
    }

    return elem_count.values().max().unwrap() - elem_count.values().min().unwrap();
}

fn part1(input: &str) -> String {
    let (template, rule_text) = input.split_once("\n\n").expect("Unable to read input");
    let result = min_max_diff(10, template, rule_text);
    return result.to_string();
}

fn part2(input: &str) -> String {
    let (template, rule_text) = input.split_once("\n\n").expect("Unable to read input");
    let result = min_max_diff(40, template, rule_text);
    return result.to_string();
}
// EOC

use std::{collections::HashMap, iter::Product};

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
        solve_part2(String::from(
            "NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C"
        ))
    );
}
