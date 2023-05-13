import Head from "next/head";

import Navbar from "@/components/Navbar";

const Term = () => {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16" />
        <div className="pt-16 bg-white col-span-2 border border-light-gray text-sm">
          <h1 className="text-3xl font-bold text-center py-5">
            Privacy Notification
          </h1>
          <p className="py-3 px-8 indent-10">
            Tavitter respects your privacy and is fully committed to protecting
            your personal information and using it properly and in compliance
            with the PDPA. Please take a few moments to read this privacy notice
            before you access or use the services. By using or accessing the
            Tavitter site, you acknowledge that you have read and fully
            understand this privacy notice and that it applies to your use of
            the services. If you do not read and fully understand this privacy
            notice, please do not use the site or services. This privacy notice
            is not intended to override the terms of any contract you have with
            us or any rights you might have under applicable data privacy laws.
            If you have read this policy but would like further clarification,
            please contact us at{" "}
            <span className="text-app-red">support@tavitter.com</span>.
          </p>

          <h2 className="text-xl font-semibold border-b p-3">
            What information do we collect?
          </h2>
          <p className="py-3 px-8 indent-10">
            According to the{" "}
            <i>
              Personal Data Protection Act (PDPA), 2019," personal information"
              or "personal data"
            </i>{" "}
            is any information or data relating to a person that enables the
            identification of such a person, whether directly or indirectly, but
            not including the information or data of the deceased person in
            particular.
          </p>
          <p className="py-3 px-8 indent-10">
            To provide you with the services, we may collect personal
            information relating to an identified natural person (information).
          </p>
          <p className="py-3 px-8 indent-10">
            We collect information in order to provide, operate, and improve our
            site and services, to administer your use of the site and services
            (as defined below), and to enable you to enjoy and easily navigate
            our site and services. Additionally, we collect your information,
            among other reasons stated below, to provide you with ongoing
            customer assistance and technical support and to enhance our data
            security. By accessing our site and services, you agree that you
            have given your full consent to the information listed below.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            The information you provide us
          </h3>
          <p className="pt-3 px-8 indent-10">
            When you register for our services and create an account via the
            site, we collect information you include in your communications with
            us, which may include the following:
          </p>
          <ul className="px-24 list-disc list-outside">
            <li>Username</li>
            <li>Password</li>
            <li>Email Address</li>
            <li>Phone Number</li>
          </ul>
          <p className="py-3 px-8 indent-10">
            If you create your account using your login credentials from a
            third-party site or service, we'll be able to access and collect
            your name, email address, and other data that your privacy settings
            on that third-party site or service permit us to access, but we
            don't receive or store passwords for those third-party sites and
            services.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            The information collected through your use of the site and services
          </h3>
          <p className="pt-3 px-8 indent-10">
            When you are visiting or using our site or services, including when
            you browse the site or a user account, edit your account and upload
            information and content, and/or download and use any site feature or
            services, we are aware of it and will usually gather, collect, and
            record such uses, sessions, and related information, either
            independently or with the help of third-party services as detailed
            herein, including through the use of <i>cookies</i> and other
            tracking technologies.
          </p>
          <p className="py-3 px-8 indent-10">
            Our servers automatically collect and record certain information
            about how a person uses our services. We refer to this information
            as <i>log data.</i> Log data may include information such as a
            user's ID, email identifier, the pages or features of our services
            to which a user clicked or browsed, the links on our services on
            which a user clicked, and other statistics.
          </p>
          <p className="py-3 px-8 indent-10">
            Our site and services are designed to help you share information
            with the world. Most of the information you provide us through
            posing is information you are asking us to make public. Your post
            (also called Taveet), which you created, may consist of creation
            time, language, location, picture, and more. Since your post can be
            used indirectly to identify you, it is identified as information.
            You will have full responsibility for controlling your content.
            Sensitive content in your post related to racial or ethnic origin,
            political opinions, cult, religious, or philosophical beliefs,
            sexual behavior, criminal records, health data, disability, trade
            union information, genetic data, biometric data, or any content that
            may affect you in the same manner is only in your control. Please
            carefully review your content before posting.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            The information we collect from other sources
          </h3>
          <p className="py-3 px-8 indent-10">
            If you create your account using your login credentials from a
            third-party site or service, we'll be able to access and collect the
            data that your privacy settings on that third-party site or service
            permit us to access, but we never receive or store passwords for
            those third-party sites and services. We cannot delete or change any
            information that is stored on third-party sites and services.
          </p>

          <h2 className="text-xl font-semibold border-b p-3">
            How do we use such information?
          </h2>
          <p className="py-3 px-8 indent-10">
            We use your information for the following purposes: to provide and
            operate the services; to enhance our data security; to create
            aggregated statistical data and other aggregated and/or inferred
            information, which we may use to provide and improve our respective
            services; to help us in updating, expanding, and analyzing our
            records to identify new users; and to comply with any applicable
            laws and regulations.
          </p>
          <p className="pt-3 px-8 indent-10">
            We will only use your information for the purposes set out in the
            first paragraph of this section if you give us your permission
            and/or we are satisfied that:
          </p>
          <ul className="pb-3 px-24 list-decimal list-outside">
            <li>
              Our use of your information is necessary to perform a contract or
              take steps to enter into a contract with you (e.g., to provide you
              with services or to provide you with our customer assistance and
              technical support) or
            </li>
            <li>
              Our use of your information is necessary to comply with a relevant
              legal or regulatory obligation that we have, or
            </li>
            <li>
              Our use of your information is necessary to support legitimate
              interests that we have as a business (for example, to maintain and
              improve our services by identifying user trends or identifying
              technical issues), provided it is conducted at all times in a way
              that is proportionate to, and that respects your privacy rights.
            </li>
          </ul>

          <h2 className="text-xl font-semibold border-b p-3">
            Where do we store your information?
          </h2>
          <p className="py-3 px-8 indent-10">
            We securely store your data on our company's highly secure server
            located in Thailand. We will keep your data until the end of
            service, unless you request information restriction, deletion, or
            something else.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Your rights in relation to your information
          </h3>
          <p className="py-3 px-8 indent-10">
            This privacy notice follows the latest Thai PDPA (year 2019), so we
            inform you of the following rights and how you would exercise them.
            For more information about PDPA, please see the{" "}
            <a
              href="https://data.thailand.opendevelopmentmekong.net/th/laws_record/2562/resource/ec616be5-9fbf-4071-b4b5-cb1f3e46e826"
              className="text-app-red"
            >
              PDPA English Version.
            </a>{" "}
            However, we also ensure that this privacy notification also complies
            with the General Data Protection Regulation (GDPR), which is a
            template of the PDPA. Therefore, you have the right to access,
            rectification, erasure, restriction of processing, and data
            portability under certain conditions.
          </p>
          <p className="py-3 px-8 indent-10">
            If you have any questions or concerns about our collection, use, or
            disclosure of information, or if you believe that we have not
            complied with this privacy notice or application data protection
            laws, please contact us.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Withdrawal of consent in your information
          </h3>
          <p className="py-3 px-8 indent-10">
            You may withdraw your consent to providing information at any time.
            The withdrawal of consent shall be as easy as giving consent, unless
            there is a restriction on the withdrawal of consent by law or a
            contract that gives benefits to you. However, the withdrawal of
            consent shall not affect the collection, use, or disclosure of
            information to which you have already legally given consent (Section
            19, Paragraph 5).
          </p>
          <p className="py-3 px-8 indent-10">
            You can withdraw your consent by deleting your account. After
            account deletion, we will no longer collect further information from
            you. But the previously consented information will be kept for
            possible legal acts and service improvements in the future.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Requesting a copy of your information
          </h3>
          <p className="py-3 px-8 indent-10">
            You are entitled to request access to and obtain a copy of the
            information related to you that is under our responsibility, or to
            request the disclosure of the acquisition of the information
            obtained without your consent (Section 30, Paragraph 1).
          </p>
          <p className="py-3 px-8 indent-10">
            If there is some information we collect that is not specified in
            this privacy notice or you want a copy of information related to
            you, you can contact us via the given address or email and specify
            the scope of what you need to know. The report on your request will
            be sent within 30 days from the date we receive it.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Requesting information and transferring information
          </h3>
          <p className="pt-3 px-8 indent-10">
            You shall have the right to receive information concerning yourself
            from us. We shall arrange for such information to be in a format
            that is readable or commonly used by automatic tools or equipment
            and can be used or disclosed in automated ways (Section 31,
            paragraph 1). You are also entitled to:
          </p>
          <ul className="px-24 list-decimal list-outside">
            <li>
              Request us to send or transfer information in such formats to
              another data controller if it can be done automatically
            </li>
            <li>
              Request to directly obtain information in such formats that we
              send or transfer to other data collectors, unless it is impossible
              to do so because of the technical circumstances.
            </li>
          </ul>

          <h3 className="text-lg font-semibold py-3 px-8">
            Objecting to the collection, use, or disclosure of information
          </h3>
          <p className="pt-3 px-8 indent-10">
            You have the right to object to the collection, use, or disclosure
            of information concerning yourself at any time, following the
            circumstances specified in Section 32.
          </p>
          <p className="pt-3 px-8 indent-10">
            In this case, we will no longer be able to collect, use, or disclose
            such information. After verifying your objection request, we will
            remove removable information, including your account, and make the
            remaining information anonymous.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Destroying and anonymizing your information
          </h3>
          <p className="pt-3 px-8 indent-10">
            You shall have the right to request that we erase or destroy the
            information or anonymize the information to become anonymous data
            that cannot identify you, where the ground specified in Section 33
            applies.
          </p>
          <p className="pt-3 px-8 indent-10">
            Similar to the previous section (object to collection, use, or
            disclosure of information), we will remove removable information,
            including your account, and make the remaining information
            anonymous.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Restricting the use of information
          </h3>
          <p className="pt-3 px-8 indent-10">
            You shall have the right to request that we restrict the use of the
            information where the condition specified in Section 34 applies.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Keeping the information present, complete, and not creating
            misunderstandings
          </h3>
          <p className="pt-3 px-8 indent-10">
            In the case where you request that we act in compliance with Section
            35, which ensures that information remains accurate, up-to-date,
            complete, and not misleading, if we do not take action regarding
            your request, we shall record your request, together with reasons,
            in the record as prescribed in Section 39 (Section 36, Paragraph 1).
          </p>
          <p className="pt-3 px-8 indent-10">
            However, we do not have permission to alter your information. Your
            information will always remain as you entered it, unless some error
            occurs. Therefore, keeping your information present, complete, and
            not creating misunderstandings is your responsibility. You can
            change your account information in your profile settings at any
            time.
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">Filing a complaint</h3>
          <p className="pt-3 px-8 indent-10">
            You have the right to file a complaint in the event that our site or
            services, including employees, violate or do not comply with this
            act or a notification issued in accordance with this act (Section
            73, Paragraph 1).
          </p>

          <h3 className="text-lg font-semibold py-3 px-8">
            Changes to this privacy notification
          </h3>
          <p className="pt-3 px-8 indent-10">
            We may revise this privacy notice from time to time. The most recent
            will govern our use of your information and will always be on our
            site. If we make any changes to this privacy notice, we will notify
            you via an official update notification. By continuing to access or
            use our site and services after these changes become effective, you
            agree to be bound by the revised privacy notice.
          </p>

          <h2 className="text-xl font-semibold border-b p-3">Contract us</h2>
          <p className="pt-3 px-8">
            If you have any questions about this privacy notice or wish to
            exercise your rights as described, please contact our administrator
            team at:
          </p>
          <p className="py-3 px-8 pb-16">
            Room 202, Kasetsart University 50 Ngamwongwan Rd,<br/>
            Chatuchak Bangkok 10900 Thailand<br/>
            Email:{" "}
            <span className="text-app-red">support@tavitter.com</span>
          </p>
        </div>
        <div className="pt-16" />
      </div>
    </>
  );
};
export default Term;
