use serde::{Deserialize, Serialize};
use rand::seq::IndexedRandom;
use rand::rng;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![genpassword])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
#[derive(Serialize, Deserialize)]
struct PasswordOptions {
    length: u8,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
}
#[tauri::command]
fn genpassword(options: PasswordOptions) -> String {
    let lowercase = "abcdefghijklmnopqrstuvxyz";
    let uppercase= "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    let symbols = "!@#$%^&*()-_=+[]{}:;,.?";
    let numbers = "123456789";
    let mut rng = rng();

    let mut letters = Vec::new();
    let mut range = Vec::new();

    //first char
    if options.lowercase == true {
        letters.extend(lowercase.chars())
    } else {
        letters.extend(uppercase.chars())
    }

    if options.lowercase == true {
        range.extend(lowercase.chars());
    }
        if options.uppercase == true {
        range.extend(uppercase.chars());
    }
        if options.symbols == true {
        range.extend(symbols.chars());
    }
        if options.numbers == true {
        range.extend(numbers.chars());
    }

    let mut password = String::new();
    for _ in 0..options.length {
    if let Some(c) = range.choose(&mut rng) {
        password.push(*c);
}
    }
    password
}
