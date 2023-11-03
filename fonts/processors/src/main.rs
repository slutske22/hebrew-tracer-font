use clap::Parser;
use std::fs;

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

    println!("Processing files from {}", args.source);

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
        let filename = path.unwrap().path();
        let extension = filename.extension();

        if extension.unwrap() == "svg" {
            println!("Processing {}", filename.display());

            // do stuff here
        }
    }
}
