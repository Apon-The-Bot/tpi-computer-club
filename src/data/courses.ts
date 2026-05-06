export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  videoEmbedUrl: string;
  description: string;
  resources?: { label: string; url: string }[];
  courseSlug: string;
  moduleId: string;
}
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}
export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
  instructor: string;
  icon: string; // emoji-style fallback
  accent: "gold" | "cyber" | "emerald" | "rose" | "violet";
  learningOutcomes: string[];
  modules: Module[];
  resources: { label: string; url: string }[];
}

const yt = (id: string) => `https://www.youtube.com/embed/${id}`;

function mod(
  courseSlug: string,
  id: string,
  title: string,
  description: string,
  lessonTitles: string[]
): Module {
  return {
    id,
    title,
    description,
    lessons: lessonTitles.map((t, i) => {
      const slug = `${id}-l${i + 1}`;
      return {
        id: slug,
        slug,
        title: t,
        duration: `${8 + ((i * 3) % 12)} min`,
        videoEmbedUrl: yt("dQw4w9WgXcQ"),
        description: `In this lesson you'll explore ${t.toLowerCase()} with hands-on examples, exercises, and a guided walkthrough by your instructor.`,
        resources: [
          { label: "Lesson Slides (PDF)", url: "#" },
          { label: "Practice Exercises", url: "#" },
        ],
        courseSlug,
        moduleId: id,
      };
    }),
  };
}

export const courses: Course[] = [
  {
    slug: "c-programming",
    title: "C Programming",
    shortDescription: "Master the foundations of programming with C.",
    overview:
      "A complete introduction to procedural programming using C. Learn syntax, memory, pointers, and build a strong base for any future language.",
    level: "Beginner",
    duration: "8 weeks",
    category: "Programming",
    instructor: "Md. Rakibul Islam",
    icon: "C",
    accent: "cyber",
    learningOutcomes: [
      "Write, compile and debug C programs",
      "Master control flow, functions and arrays",
      "Understand pointers and memory management",
      "Read and write files in C",
    ],
    modules: [
      mod("c-programming", "m1", "Introduction to Programming", "What programming is, toolchain setup and your first program.", [
        "What is Programming?",
        "Setting Up Your Compiler",
        "Your First C Program",
        "Compiling & Running Code",
      ]),
      mod("c-programming", "m2", "Variables, Data Types & Operators", "Storing and operating on data.", [
        "Variables & Data Types",
        "Input & Output",
        "Operators in C",
        "Type Conversion",
      ]),
      mod("c-programming", "m3", "Conditions & Loops", "Decision making and iteration.", [
        "if / else Statements",
        "switch Cases",
        "while & do-while",
        "for Loops",
      ]),
      mod("c-programming", "m4", "Functions & Arrays", "Modular code and collections.", [
        "Defining Functions",
        "Scope & Recursion",
        "1D Arrays",
        "Multi-dimensional Arrays",
      ]),
      mod("c-programming", "m5", "Pointers & File Handling", "Low-level power features of C.", [
        "Pointer Basics",
        "Pointers & Arrays",
        "Dynamic Memory",
        "File I/O in C",
      ]),
    ],
    resources: [{ label: "C Reference Cheatsheet", url: "#" }],
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    shortDescription: "Object-oriented programming with modern C++.",
    overview:
      "Build on your C foundations with classes, objects, inheritance and the Standard Template Library to write powerful, reusable code.",
    level: "Intermediate",
    duration: "8 weeks",
    category: "Programming",
    instructor: "Sharmin Akter",
    icon: "C++",
    accent: "gold",
    learningOutcomes: [
      "Apply OOP principles in C++",
      "Design classes with encapsulation",
      "Use inheritance and polymorphism",
      "Work with the STL collections",
    ],
    modules: [
      mod("cpp-programming", "m1", "C++ Basics", "Migrating from C to C++.", [
        "C vs C++",
        "Streams & I/O",
        "References",
        "Namespaces",
      ]),
      mod("cpp-programming", "m2", "OOP Concepts", "Pillars of object-oriented design.", [
        "Encapsulation",
        "Abstraction",
        "Inheritance Overview",
        "Polymorphism Overview",
      ]),
      mod("cpp-programming", "m3", "Classes & Objects", "Building your own types.", [
        "Defining Classes",
        "Constructors & Destructors",
        "this Pointer",
        "Static Members",
      ]),
      mod("cpp-programming", "m4", "Inheritance & Polymorphism", "Reuse and dynamic dispatch.", [
        "Single Inheritance",
        "Multiple Inheritance",
        "Virtual Functions",
        "Abstract Classes",
      ]),
      mod("cpp-programming", "m5", "STL Basics", "Using ready-made data structures.", [
        "vector & list",
        "map & set",
        "Iterators",
        "Algorithms",
      ]),
    ],
    resources: [{ label: "C++ Style Guide", url: "#" }],
  },
  {
    slug: "csharp-programming",
    title: "C# Programming",
    shortDescription: "Build modern apps with C# and .NET.",
    overview:
      "Learn C# from the ground up and explore the .NET ecosystem. End the course with a small Windows Forms application.",
    level: "Intermediate",
    duration: "8 weeks",
    category: "Programming",
    instructor: "Tanvir Hossain",
    icon: "C#",
    accent: "violet",
    learningOutcomes: [
      "Write idiomatic C# code",
      "Understand .NET runtime basics",
      "Apply OOP in C#",
      "Build a basic Windows Forms app",
    ],
    modules: [
      mod("csharp-programming", "m1", "C# Fundamentals", "Syntax, types and structure.", [
        "Hello, C#",
        "Variables & Types",
        "Control Flow",
        "Methods",
      ]),
      mod("csharp-programming", "m2", ".NET Basics", "The platform behind C#.", [
        "What is .NET?",
        "CLR & BCL",
        "Project Structure",
        "NuGet Packages",
      ]),
      mod("csharp-programming", "m3", "OOP in C#", "Object-oriented design with C#.", [
        "Classes & Records",
        "Interfaces",
        "Inheritance",
        "Properties & Events",
      ]),
      mod("csharp-programming", "m4", "Windows Forms", "Building a desktop UI.", [
        "Forms & Controls",
        "Event Handling",
        "Layouts",
        "Mini Project: Calculator",
      ]),
      mod("csharp-programming", "m5", "File & Data Handling", "Persistence in C#.", [
        "File I/O",
        "JSON Serialization",
        "LINQ Basics",
        "Working with Collections",
      ]),
    ],
    resources: [{ label: ".NET Docs", url: "https://learn.microsoft.com/dotnet" }],
  },
  {
    slug: "graphics-design",
    title: "Graphics Design",
    shortDescription: "Visual design fundamentals with Photoshop & Illustrator.",
    overview:
      "Learn the principles of design and apply them using industry-standard tools to create posters, logos and social media content.",
    level: "Beginner",
    duration: "6 weeks",
    category: "Design",
    instructor: "Nusrat Jahan",
    icon: "Gd",
    accent: "rose",
    learningOutcomes: [
      "Apply core design principles",
      "Use color and typography effectively",
      "Operate Photoshop & Illustrator",
      "Deliver polished social media designs",
    ],
    modules: [
      mod("graphics-design", "m1", "Design Principles", "Foundations of visual design.", [
        "Balance & Alignment",
        "Contrast & Hierarchy",
        "Repetition & Rhythm",
        "Composition Basics",
      ]),
      mod("graphics-design", "m2", "Color & Typography", "Visual language essentials.", [
        "Color Theory",
        "Building Palettes",
        "Type Anatomy",
        "Pairing Fonts",
      ]),
      mod("graphics-design", "m3", "Photoshop Basics", "Raster editing fundamentals.", [
        "Workspace Tour",
        "Layers & Masks",
        "Photo Retouching",
        "Exporting Assets",
      ]),
      mod("graphics-design", "m4", "Illustrator Basics", "Working with vectors.", [
        "Shapes & Pen Tool",
        "Logo Construction",
        "Color & Gradient",
        "Exporting SVG",
      ]),
      mod("graphics-design", "m5", "Social Media Project", "Apply your skills.", [
        "Project Brief",
        "Mood Board",
        "Designing the Set",
        "Final Presentation",
      ]),
    ],
    resources: [{ label: "Brand Guidelines Template", url: "#" }],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    shortDescription: "Defensive fundamentals every IT student needs.",
    overview:
      "Understand the threat landscape, network basics, web security and the mindset of an ethical hacker — taught at a beginner-friendly level.",
    level: "Beginner",
    duration: "6 weeks",
    category: "Security",
    instructor: "Arman Chowdhury",
    icon: "Cs",
    accent: "emerald",
    learningOutcomes: [
      "Identify common threats",
      "Understand networking basics",
      "Recognize web vulnerabilities",
      "Apply secure account practices",
    ],
    modules: [
      mod("cyber-security", "m1", "Cyber Security Fundamentals", "Mindset and basics.", [
        "Threat Landscape",
        "CIA Triad",
        "Risk & Attack Surface",
        "Security Mindset",
      ]),
      mod("cyber-security", "m2", "Networking Basics", "How data moves.", [
        "OSI Model",
        "TCP/IP Essentials",
        "DNS & HTTP",
        "Common Ports",
      ]),
      mod("cyber-security", "m3", "Web Security Basics", "Protecting the web.", [
        "OWASP Top 10",
        "XSS Explained",
        "SQL Injection",
        "Secure Headers",
      ]),
      mod("cyber-security", "m4", "Account Security", "Protect users and yourself.", [
        "Strong Passwords",
        "MFA & Recovery",
        "Phishing Awareness",
        "Password Managers",
      ]),
      mod("cyber-security", "m5", "Ethical Hacking Intro", "Thinking like an attacker.", [
        "Reconnaissance",
        "Scanning Basics",
        "Intro to Kali Linux",
        "Bug Bounty Programs",
      ]),
    ],
    resources: [{ label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getLesson = (courseSlug: string, lessonSlug: string) => {
  const c = getCourse(courseSlug);
  if (!c) return null;
  for (const m of c.modules) {
    const l = m.lessons.find((x) => x.slug === lessonSlug);
    if (l) return { course: c, module: m, lesson: l };
  }
  return null;
};
export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
