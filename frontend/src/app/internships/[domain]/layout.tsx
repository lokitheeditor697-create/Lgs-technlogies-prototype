import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ domain: string }>
}

export async function generateStaticParams() {
  return [
    { domain: 'ui-ux-designing' },
    { domain: 'ai-ml-development' },
    { domain: 'gst-taxation' },
    { domain: 'hr' },
    { domain: 'sales-marketing' },
    { domain: 'python-development' },
    { domain: 'web-development' },
    { domain: 'data-science' },
    { domain: 'data-analytics' },
    { domain: 'cyber-security' },
    { domain: 'cloud-computing' },
    { domain: 'digital-marketing' },
    { domain: 'finance' },
    { domain: 'business-analytics' }
  ];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { domain } = await params;
  
  // Format the slug (e.g., "python-development" -> "Python Development")
  const slugToName: Record<string, string> = {
    "ui-ux-designing": "UI/UX Designing",
    "ai-ml-development": "AI & ML Development",
    "gst-taxation": "GST & Taxation",
    "hr": "HR",
    "sales-marketing": "Sales & Marketing"
  };

  const displayDomain = slugToName[domain] || domain.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${displayDomain} Internship Program | LGS Technologies`,
    description: `Apply for the exclusive ${displayDomain} Internship at LGS Technologies. Gain practical experience, complete industry-grade projects, and earn a verified certificate.`,
    openGraph: {
      title: `${displayDomain} Internship - LGS Technologies`,
      description: `Join our highly demanded ${displayDomain} program. Real-world projects, mentor support, and certification!`,
      url: `https://lgstechnologies.in/internships/${domain}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayDomain} Internship | LGS Technologies`,
      description: `Start your career in ${displayDomain} with our hands-on internship program.`,
    }
  };
}

export default function InternshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
