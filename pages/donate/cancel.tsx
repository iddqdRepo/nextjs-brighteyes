import Link from "next/link";
import {
  FooterSection,
  HeadTag,
} from "../../components/common/CommonComponents";
import NavbarComponent from "../../components/Navbar/NavbarComponent";

function DonationCancelPage() {
  return (
    <>
      <HeadTag
        title={"Donation not completed - Bright Eyes Animal Sanctuary"}
        metaContent={"Donation not completed"}
        linkHref={"/donate/cancel"}
      />
      <NavbarComponent />
      <main className="bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8b3479]">
            Donation cancelled
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 font-poppins">
            Your card donation was not completed
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 font-poppins">
            No problem. You can return to the donation form whenever you are
            ready.
          </p>
          <Link href="/donate">
            <a className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Back to donate
            </a>
          </Link>
        </div>
      </main>
      <FooterSection />
    </>
  );
}

export default DonationCancelPage;
