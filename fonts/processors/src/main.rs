use clap::{arg, Parser};
use colored::Colorize;
use std::{fs, io, path};

/// The command line arguments to use when running the program
///
/// example cargo run -- --source ../fonts/cousine/glyphs/original
///
/// example cargo run -- -s ../fonts/cousine/glyphs/original -d ../fonts/cousine/glyphs/bubble
#[derive(Parser, Debug)]
struct Args {
    /// The source directory to use
    #[arg(short, long)]
    source: String,

    /// The destination directory to write files to, defaults to source/output
    #[arg(short, long)]
    dest: Option<String>,
}

fn main() {
    let args = Args::parse();

    println!("\nProcessing files from {}\n...", args.source.blue());

    let destination = args.dest.unwrap_or(String::from("/output"));

    let mut paths = fs::read_dir(args.source).unwrap();

    let svgs_present = &paths.any(|p| {
        p.as_ref().unwrap().path().extension().is_some()
            && &*p.as_ref().unwrap().path().extension().unwrap() == "svg"
    });

    if !svgs_present {
        println!("\nOops! You input a directory without any svg files\n");
        return;
    }

    for path in paths {
        let filepath = path.as_ref().unwrap().path();
        let filename = path.as_ref().unwrap().file_name();
        let extension = filepath.extension();

        if extension.unwrap() == "svg" {
            let mut contents = std::fs::read_to_string(&filepath).unwrap();

            contents = contents.replace(
                "fill=\"currentColor\"",
                "fill=\"none\" stroke=\"black\" stroke-width=\"40\"",
            );

            let mut file_path = destination.to_owned();
            file_path.push_str(filename.to_str().unwrap());

            if !path::Path::new(&destination).exists() {
                println!(
                    "\nDestination path \"{}\" does not exist, would you like to create it? (y) or (n)",
                    &destination.blue()
                );

                let mut create_for_you = String::new();
                match io::stdin().read_line(&mut create_for_you) {
                    Err(e) => println!("Error creating input, {:?}", e),
                    Ok(_) => {}
                }

                if create_for_you.trim().parse::<String>().unwrap() == "y" {
                    println!("Creating directory at {}\n", destination);
                    match fs::create_dir_all(&destination) {
                        Err(e) => println!("Error creating dir, {:?}", e),
                        Ok(_) => {}
                    }
                } else {
                    println!("\nExiting...\n");
                    break;
                }
            }

            match fs::write(file_path, contents) {
                Err(e) => println!("Error reading file:\n{:?}", e),
                Ok(_) => {}
            }
        }
    }

    println!("{}\n\n", "Done!".green())
}
