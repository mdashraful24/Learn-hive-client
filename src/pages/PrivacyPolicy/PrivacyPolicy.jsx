import React from "react";

const PrivacyPolicy = () => {
    return (
        <main className="container mx-auto min-h-screen mt-7 md:mt-10 mb-16 px-2 md:px-3 lg:px-2.5">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Privacy Policy
                    </h1>

                    <p className="mt-3 text-sm">
                        Last updated: August 08, 2026
                    </p>
                </div>

                <div className="space-y-10 leading-7">
                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            1. Introduction
                        </h2>

                        <p>
                            Welcome to LearnHive. LearnHive is an education and course
                            management platform designed to connect tutors, student learners,
                            and educational administrators in a modern and interactive
                            learning environment.
                        </p>

                        <p className="mt-3">
                            We respect your privacy and are committed to protecting the
                            personal information you provide while using our platform. This
                            Privacy Policy explains what information we collect, how we use
                            it, and how we protect it.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            2. Information We Collect
                        </h2>

                        <p>
                            When you use LearnHive, we may collect information necessary to
                            provide and improve our services, including:
                        </p>

                        <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>Name and profile information</li>
                            <li>Email address and contact information</li>
                            <li>Account credentials and authentication information</li>
                            <li>Course enrollment and learning activity</li>
                            <li>Payment and transaction information</li>
                            <li>Course materials and content uploaded by tutors</li>
                            <li>Messages, reviews, and feedback submitted through the platform</li>
                            <li>Technical information such as browser, device, and IP address</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            3. How We Use Your Information
                        </h2>

                        <p>
                            We use collected information to operate, maintain, and improve
                            LearnHive. This may include:
                        </p>

                        <ul className="mt-4 list-disc space-y-2 pl-6">
                            <li>Creating and managing user accounts</li>
                            <li>Processing course enrollments</li>
                            <li>Managing class schedules and learning activities</li>
                            <li>Processing payments and transactions</li>
                            <li>Providing personalized dashboards and recommendations</li>
                            <li>Communicating important account and platform updates</li>
                            <li>Improving platform functionality and user experience</li>
                            <li>Preventing fraud, abuse, and unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            4. Payment Information
                        </h2>

                        <p>
                            Payments made through LearnHive may be processed by third-party
                            payment providers. We do not intentionally store complete
                            payment card information on our own servers when payment
                            processing is handled by an external payment provider.
                        </p>

                        <p className="mt-3">
                            Payment providers may collect and process information according
                            to their own privacy policies and terms of service.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            5. Cookies and Similar Technologies
                        </h2>

                        <p>
                            LearnHive may use cookies and similar technologies to maintain
                            authentication sessions, remember preferences, improve
                            performance, and understand how users interact with the
                            platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            6. Information Sharing
                        </h2>

                        <p>
                            We do not sell or rent your personal information. Information may
                            be shared with trusted service providers when necessary to
                            operate LearnHive, process payments, provide authentication,
                            maintain infrastructure, or comply with legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            7. Data Security
                        </h2>

                        <p>
                            We take reasonable technical and organizational measures to
                            protect your information from unauthorized access, alteration,
                            disclosure, or destruction. However, no internet-based service
                            can guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            8. Account Responsibilities
                        </h2>

                        <p>
                            You are responsible for keeping your account credentials
                            confidential and for all activities performed through your
                            account. Please notify LearnHive if you believe your account has
                            been accessed without authorization.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            9. Data Retention
                        </h2>

                        <p>
                            We retain personal information for as long as reasonably
                            necessary to provide our services, maintain business records,
                            resolve disputes, enforce agreements, and comply with applicable
                            legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            10. Your Privacy Rights
                        </h2>

                        <p>
                            Depending on applicable law, you may have rights regarding your
                            personal information, including requesting access, correction,
                            deletion, or restriction of certain information.
                        </p>

                        <p className="mt-3">
                            To request changes to your personal information, please contact
                            the LearnHive support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            11. Children&apos;s Privacy
                        </h2>

                        <p>
                            LearnHive is not intended to knowingly collect personal
                            information from children without appropriate authorization. If
                            you believe that a child has provided personal information
                            without appropriate consent, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            12. Changes to This Privacy Policy
                        </h2>

                        <p>
                            We may update this Privacy Policy from time to time. When
                            significant changes are made, we may provide an appropriate
                            notification through the platform or other communication
                            channels.
                        </p>
                    </section>

                    <section>
                        <h2 className="mb-3 text-2xl font-semibold">
                            13. Contact Us
                        </h2>

                        <p>
                            If you have questions or concerns about this Privacy Policy,
                            please contact the LearnHive support team.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
