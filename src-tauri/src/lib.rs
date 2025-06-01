use serde::{Deserialize, Serialize};

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
    readablechars: bool,
}
#[tauri::command]
fn genpassword(options: PasswordOptions) -> (String, u8) {
    let b = options.length+1;
    let a = String::from("{}");
    (a,b)
}
