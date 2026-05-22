import { CaseStudy, UserBio } from './types';

export const DEFAULT_BIO: UserBio = {
  name: "Clara Yoon",
  title: "Staff UX Researcher",
  location: "Tupelo, MS",
  summary: "Seasoned user researcher with a track record of delivering insights and driving strategy that influence product, design, and business decisions. Leads qualitative and mixed methods user research that shapes product development grounded in user needs and enhanced usability across consumer mobile products. Proven ability to build and mature research practices to drive forward a user-centric culture within Product and Design organizations.",
  paragraphs: [
    "I specialize in mixed methods user research, turning deep qualitative insights and solid quantitative trends into clean, actionable product strategy. Grounded in user needs, I lead foundational research across mobile apps and commerce platforms that coordinates cleanly with Product, Design, Engineering, and Analytics leads.",
    "Previously, I served as Lead UX Researcher at Hungryroot and Staff UX Researcher at Grubhub, where I launched and scaled usability programs, established quantitative metrics (UMUX-Lite) to prioritize backlogs, and implemented tools reducing qualitative synthesis time by 50%.",
    "Grounded in a multidisciplinary background, I hold a Master of Arts in Global Governance and a Nielsen Norman Group User Experience Certificate, driving human-centered excellence at every product touchpoint."
  ],
  photoUrl: "", // Empty to prioritize a gorgeous initial medallion or allow custom avatar uploads
  resumeUrl: "",
  resumeFilename: "Clara_Yoon_UXR_Resume.pdf",
  linkedinUrl: "https://linkedin.com/in/yoonclara",
  headerFocus1: "Asking the ",
  headerFocus2: "right questions",
  headerFocus3: ", at the ",
  headerFocus4: "right time",
  headerFocus5: ", with the ",
  headerFocus6: "right people.",
  headerSub: "Inspired by Traditional Rhythms & Responsive Inventions",
  aboutTabLabel: "About Persona",
  projectsTabLabel: "Research Projects",
  linkedinTabLabel: "Linked In",
  resumeTabLabel: "Download Live CV",
  cv: {
    experiences: [
      {
        role: "Lead UX Researcher",
        company: "Hungryroot (Remote) · New York, NY",
        period: "06/2025 – current",
        bullets: [
          "Facilitated a workshop with Product & Design to inform the product strategy and roadmap for biggest acquisition period; user insights helped inform homepage iterations that led to 6% increase in conversion.",
          "Led foundational information architecture study to inform mobile app redesign, ensuring existing users can navigate the new design without friction.",
          "Positioned user research as a strategic partner with Product, Design, Engineering and Analytics leads, contributing to the future digital experience strategy conversations with the executive team."
        ]
      },
      {
        role: "Staff UX Researcher",
        company: "Grubhub (Remote) · Chicago, IL",
        period: "02/2022 – 02/2025",
        bullets: [
          "Led complex, multi-phase and mixed methods user research projects that informed new product development and feature iterations across the consumer funnel and mobile app (e.g. commerce, wallet, loyalty, monetization).",
          "Established Grubhub's first usability metric (UMUX-Lite) for the consumer app, introduced quantitative UX metrics to track improvements and prioritize backlog projects.",
          "Amplified research influence with high-impact presentations and storytelling to leadership, drove customer-centric decision-making and expanded collaborations with Product, Design, Engineering, Growth and Data Science teams.",
          "Optimized research efficiency by scaling design-led usability testing program that empowered designers to conduct over 90 usability tests and accelerated velocity and quality of product and design decisions.",
          "Improved research effectiveness by implementing new tools and processes which reduced qualitative analysis time by ~50% and established systems for roadmap prioritization, impact tracking, research repository and a global taxonomy."
        ]
      },
      {
        role: "UX Researcher",
        company: "Root Inc. (Remote) · Columbus, OH",
        period: "04/2021 – 01/2022",
        bullets: [
          "Delivered foundational insights for the retention team, co-created product strategies and feature experiments grounded in customer needs and mental models for billing and payments, renewal, and policy management.",
          "Generated insights that led to a payment experiment allowing customers to prepay premiums, driving a 10% increase in organic engagement and 1% decrease in non-payment cancellation.",
          "Led UX workshops with cross-functional teams which enhanced research alignment, study scoping, research execution and insights activation to support product strategy and business goals.",
          "Optimized research operations with standardized templates (screeners, research plans, and scripts) and mentored researchers and product designers to enhance efficiency of usability testing, concept testing and iterative design."
        ]
      },
      {
        role: "Senior Project Manager and Human-Centered Design Consultant",
        company: "MEDA · Washington, DC",
        period: "07/2015 – 03/2021",
        bullets: [
          "Conducted field research in Ukraine to assess a business grant competition's impact, coached gender experts in user research methodologies and delivered actionable insights that informed future funding rounds.",
          "Led the design of an entrepreneurship support program funded by Australia's impact investment fund, drove strategic planning through research, stakeholder interviews, and competitive analysis.",
          "Prototyped and tested an automated payment process which streamlined approvals and enabled over $2M CAD in efficient grant disbursement while ensuring compliance.",
          "Managed a team of five researchers and ten grant recipients, strengthened human-centered design capabilities and fostered collaboration."
        ]
      }
    ],
    education: [
      {
        degree: "Master of Arts (MA), Global Governance",
        school: "University of Waterloo · Waterloo, Canada",
        period: "2013 – 2015"
      },
      {
        degree: "Bachelor of Arts (BA), Global Studies",
        school: "Wilfrid Laurier University · Waterloo, Canada",
        period: "2009 – 2013"
      }
    ],
    credentials: [
      "User Experience Certificate, Nielsen Norman Group (2019)",
      "Certificate in Digital Money, Tufts University, Digital Frontiers Institute (2018)",
      "Board of Directors, Everence Federal Credit Union (2021 – Present)"
    ],
    skills: [
      "Interviews", "Usability Testing", "Concept Testing", "Prototyping", "Diary Studies",
      "Contextual Inquiry", "UX Benchmarking", "Information Architecture", "Card Sorts",
      "Tree Tests", "Surveys", "UX Workshops", "Journey Mapping", "Service Blueprinting",
      "Personas/Archetypes", "Product Quality Reviews"
    ],
    tools: [
      "Figma", "User Interviews", "UserTesting", "Condens", "Dovetail", "Qualtrics", "Alchemer", "Redash", "Tableau"
    ]
  }
};

export const DEFAULT_PROJECTS: CaseStudy[] = [
  {
    id: "project-1",
    title: "Reimagining Digital Archiving for Generation Artisans",
    subtitle: "Ethnographic research in traditional porcelain studios to preserve tacit mastercraft practices.",
    role: "Lead Design Researcher",
    duration: "3 Months (Spring 2025)",
    summary: "How do we translate a master artisan's lifetime of physical, tactile memory into an digital repository? This study used contextual inquiry and participatory design with elderly craftspeople to establish a semantic digital indexing system for traditional practices.",
    problem: "Porcelain masters depend on subtle physical cues—moisture, sound, color shifts—which are rarely captured in flat audio-visual databases. Generational archives struggle to stay relevant for younger apprentices because of this missing layer of tacit sensory data.",
    methods: ["Contextual Inquiry", "Participatory Design", "Semantic Journey Mapping", "Usability Testing"],
    phases: [
      {
        id: "p1-1",
        phase: "Phase 1: Tactile Inquiries",
        description: "Conducted 12 field visits, observing craftspeople in active workshops. Recorded physical hand postures and material temperatures to map the implicit milestones of creation."
      },
      {
        id: "p1-2",
        phase: "Phase 2: Co-designing Symbols",
        description: "Built paper and clay-based co-design toolkits enabling senior artisans to draw symbols representing micro-decisions in clay moisture levels and furnace heat."
      }
    ],
    insights: [
      {
        id: "p1-i1",
        title: "Sensory milestones precede metrics",
        description: "Artisans evaluate heat not in Celsius, but through color hues (e.g., 'persimmon yellow'). Digital tools must utilize sensory-paired color tags rather than raw numbers."
      },
      {
        id: "p1-i2",
        title: "The hand as a controller",
        description: "Standard touchscreens failed when fingers were covered in slip and clay. A physical foot-pedal record mechanism was introduced to allow hands-free bookmarking."
      }
    ],
    impact: "Designed and piloted 'Sori-Clay', resulting in an 85% capture rate of active workshop craft processes. Adopted as a foundational indexing protocol by regional cultural archives.",
    password: "hanji", // Set a clear password for demonstration that they can unlock
    imageUrl: "https://picsum.photos/seed/craft/800/600"
  },
  {
    id: "project-2",
    title: "Improving Digital Accessibility in Elder-Care Housing Schemes",
    subtitle: "Mixed-methods evaluative study of municipal housing application workflows.",
    role: "Senior UX Researcher",
    duration: "6 Months (Autumn 2024)",
    summary: "Senior citizens faced a high drop-off rate on municipal support portals. This research analyzed interface roadblocks and overhauled input paradigms, yielding a substantial boost in application completions.",
    problem: "The application system relied heavily on complex verification apps, small tap targets, and multi-step forms that timed out, creating anxiety and exclusion for seniors living alone.",
    methods: ["Usability Lab Evaluations", "Cognitive Walkthroughs", "Quantitative Funnel Audits", "Co-Design Workshops"],
    phases: [
      {
        id: "p2-1",
        phase: "Phase 1: Funnel & Cognitive Drop-off Analysis",
        description: "Audited 12,000 application sessions which showed a 58% drop-off at the external secure bank certificate integration step."
      },
      {
        id: "p2-2",
        phase: "Phase 2: Usability Lab Evaluations",
        description: "Brought 18 senior citizens (aged 65+) into a lab container environment to complete applications, documenting sight assistance usage and manual dexterity challenges."
      }
    ],
    insights: [
      {
        id: "p2-i1",
        title: "Session timeout pressure",
        description: "Short security countdown timers (e.g., 3 minutes) induced physiological stress, leading to repeated input errors. Removing constraints or allowing one-click extensions was key."
      },
      {
        id: "p2-i2",
        title: "Invisible form feedback",
        description: "Validation errors at the top of the form went unobserved by magnifier users. Placing large, clear inline indicators with speech feedback solved the issue."
      }
    ],
    impact: "The city council implemented our layout guidelines, resulting in a 34% rise in digital submissions and reducing help desk phone queries by 4,500 monthly calls.",
    imageUrl: "https://picsum.photos/seed/accessibility/800/600"
  },
  {
    id: "project-3",
    title: "Multisensory Biophilic Influence in Office Spaces",
    subtitle: "A mixed simulation and VR experiment for office garden installations.",
    role: "Quantitative Researcher",
    duration: "4 Months (Winter 2024)",
    summary: "Evaluating how digital/physical biophilic integrations alter workplace cognitive fatigue. We combined physiological biomarkers with emotional self-assessments.",
    problem: "Traditional office plants have static visual impact, but hybrid workstations lack sensory feedback loops that synchronize physical greenery with adaptive audio environments.",
    methods: ["Biometric Testing (HRV, EEG)", "Sensory Surveys", "Virtual Reality Simulation", "A/B Testing"],
    phases: [
      {
        id: "p3-1",
        phase: "Phase 1: Lab Simulations",
        description: "Monitored 45 participants solving complex mathematical tasks in static, dry workspaces vs. spaces with active, misted traditional plants and ambient trickling sounds."
      },
      {
        id: "p3-2",
        phase: "Phase 2: Virtual Reality Adaptations",
        description: "Created fully spatialized interactive models of virtual gardens to test whether visual and auditory alignment matches the calming physical presence."
      }
    ],
    insights: [
      {
        id: "p3-i1",
        title: "Auditory sync beats visual abundance",
        description: "Muted physical plants were less effective at stress reduction than a single plant accompanied by gentle, randomized natural streams and birdsong."
      },
      {
        id: "p3-i2",
        title: "The 20-minute biophilic curve",
        description: "Physiological readings (HRV) indicated the stress mitigation effect peaks after 20 minutes of continuous immersion, following a logarithmic calming curve."
      }
    ],
    impact: "Established natural-spatial design templates for 3 major corporate campuses, increasing long-term worker satisfaction levels by 18%.",
    password: "dancheong",
    imageUrl: "https://picsum.photos/seed/garden/800/600"
  }
];
