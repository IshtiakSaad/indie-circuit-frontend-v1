// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} IndieCircuit. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="#"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
