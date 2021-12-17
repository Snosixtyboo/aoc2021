use core::{cmp, str::Chars};
use num_enum::TryFromPrimitive;
use num_traits::Num;
use std::convert::TryFrom;

#[derive(Debug, PartialEq, Eq, TryFromPrimitive)]
#[repr(u8)]
enum TypeID {
    Sum = 0,
    Mul = 1,
    Min = 2,
    Max = 3,
    Lit = 4,
    Gt = 5,
    Lt = 6,
    Eq = 7,
}

enum Kind {
    Operator(Vec<Packet>, TypeID),
    Literal(u128),
    Unknown,
}

struct Packet {
    kind: Kind,
    version: u128,
    raw: String,
}

impl Packet {
    fn new() -> Packet {
        Packet {
            version: 0,
            kind: Kind::Unknown,
            raw: "".to_string(),
        }
    }
    fn consume_as_num<T: Num>(&mut self, stream: &mut Chars, n: usize, name: &str) -> T {
        let s = stream.take(n).collect::<String>();
        self.raw += &s;
        <T>::from_str_radix(&s, 2).ok().expect(&format!("{}", name))
    }
}

fn parse_packet(stream: &mut Chars) -> Packet {
    let mut packet = Packet::new();
    packet.version = packet.consume_as_num::<u128>(stream, 3, "version");
    let type_id = packet.consume_as_num::<u8>(stream, 3, "type id");
    let type_id = TypeID::try_from(type_id).expect("Unknown type id!");

    if type_id == TypeID::Lit {
        let mut result = 0;
        let mut portion = 0x10;
        while portion & 0x10 == 0x10 {
            portion = packet.consume_as_num::<u128>(stream, 5, "literal portion");
            result = result * 16 + (portion & 0xF);
        }
        packet.kind = Kind::Literal(result);
    } else {
        let mut sub_packets = Vec::<Packet>::new();
        let mut packets_to_parse = usize::MAX;
        let mut bits = usize::MAX;

        match packet.consume_as_num::<u8>(stream, 1, "length id") {
            0 => bits = packet.raw.len() + packet.consume_as_num::<usize>(stream, 15, "bit length"),
            1 => packets_to_parse = packet.consume_as_num::<usize>(stream, 11, "num packets"),
            _ => unreachable!(),
        }

        while packet.raw.len() < bits && packets_to_parse > 0 {
            let new_packet = parse_packet(stream);
            packet.raw += &new_packet.raw;
            packets_to_parse -= 1;
            sub_packets.push(new_packet);
        }
        packet.kind = Kind::Operator(sub_packets, type_id);
    }
    return packet;
}

fn eval(packet: &Packet) -> u128 {
    match &packet.kind {
        Kind::Literal(value) => *value,
        Kind::Operator(sub, type_id) => match type_id {
            TypeID::Sum => sub.iter().fold(0, |sum, p| sum + eval(p)),
            TypeID::Mul => sub.iter().fold(1, |prod, p| prod * eval(p)),
            TypeID::Min => sub.iter().fold(u128::MAX, |min, p| cmp::min(min, eval(p))),
            TypeID::Max => sub.iter().fold(0, |max, p| cmp::max(max, eval(p))),
            TypeID::Gt => (eval(&sub[0]) > eval(&sub[1])) as u128,
            TypeID::Lt => (eval(&sub[0]) < eval(&sub[1])) as u128,
            TypeID::Eq => (eval(&sub[0]) == eval(&sub[1])) as u128,
            TypeID::Lit => panic!("Literal type used for operator!"),
        },
        _ => panic!("Unknown packet type!"),
    }
}

fn sum_versions(packet: &Packet) -> u128 {
    match &packet.kind {
        Kind::Literal(_) => packet.version,
        Kind::Operator(sub, _) => sub.iter().fold(packet.version, |s, p| s + sum_versions(p)),
        _ => panic!("Unknown packet type"),
    }
}

fn str_to_bin(input: &str) -> String {
    input
        .chars()
        .map(|c| u8::from_str_radix(&c.to_string(), 16).expect("Unable to parse hex code!"))
        .map(|x| format!("{:04b}", x))
        .collect::<String>()
}

fn part1(input: &str) -> String {
    let top_packet = parse_packet(&mut str_to_bin(input).chars());
    let result = sum_versions(&top_packet);
    return result.to_string();
}

fn part2(input: &str) -> String {
    let top_packet = parse_packet(&mut str_to_bin(input).chars());
    let result = eval(&top_packet);
    return result.to_string();
}
// EOC

fn print_packet(packet: &Packet, prefix: String) {
    println!("{} ver: {}", prefix, packet.version);
    match &packet.kind {
        Kind::Literal(val) => println!("{} literal: {}", prefix, val),
        Kind::Operator(sub_packets, type_id) => {
            println!("{} {:?}", prefix, type_id);
            for s in sub_packets {
                print_packet(s, prefix.clone() + "  ");
            }
        }
        _ => panic!("Unknown packet type!"),
    }
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
    println!("{}", solve_part2(String::from("A20D5CECBD6C061006E7801224AF251AEA06D2319904921880113A931A1402A9D83D43C9FFCC1E56FF29890E00C42984337BF22C502008C26982801009426937320124E602BC01192F4A74FD7B70692F4A74FD7B700403170400F7002DC00E7003C400B0023700082C601DF8C00D30038005AA0013F40044E7002D400D10030C008000574000AB958B4B8011074C0249769913893469A72200B42673F26A005567FCC13FE673004F003341006615421830200F4608E7142629294F92861A840118F1184C0129637C007C24B19AA2C96335400013B0C0198F716213180370AE39C7620043E0D4788B440232CB34D80260008645C86D16C401B85D0BA2D18025A00ACE7F275324137FD73428200ECDFBEFF2BDCDA70D5FE5339D95B3B6C98C1DA006772F9DC9025B057331BF7D8B65108018092599C669B4B201356763475D00480010E89709E090002130CA28C62300265C188034BA007CA58EA6FB4CDA12799FD8098021400F94A6F95E3ECC73A77359A4EFCB09CEF799A35280433D1BCCA666D5EFD6A5A389542A7DCCC010958D85EC0119EED04A73F69703669466A048C01E14FFEFD229ADD052466ED37BD8B4E1D10074B3FF8CF2BBE0094D56D7E38CADA0FA80123C8F75F9C764D29DA814E4693C4854C0118AD3C0A60144E364D944D02C99F4F82100607600AC8F6365C91EC6CBB3A072C404011CE8025221D2A0337158200C97001F6978A1CE4FFBE7C4A5050402E9ECEE709D3FE7296A894F4C6A75467EB8959F4C013815C00FACEF38A7297F42AD2600B7006A0200EC538D51500010B88919624CE694C0027B91951125AFF7B9B1682040253D006E8000844138F105C0010D84D1D2304B213007213900D95B73FE914CC9FCBFA9EEA81802FA0094A34CA3649F019800B48890C2382002E727DF7293C1B900A160008642B87312C0010F8DB08610080331720FC580")));
}
