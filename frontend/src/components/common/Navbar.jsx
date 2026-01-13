import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { useAuth } from "../../AuthContext";
import { FaSearch } from "react-icons/fa";
import "../../styles/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [search, setSearch] = useState(true);

  const { user, logout } = useAuth();

  // Scroll effect (same behavior, cleaned)
  useEffect(() => {
    const onScroll = () => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;

      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCustomer = user?.roles?.[0] === "ROLE_CUSTOMER";
  const isProvider = user?.roles?.[0] === "ROLE_PROVIDER";
  const isAdmin = user?.roles?.[0] === "ROLE_ADMIN";

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-inner">
        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="brand">
            <div className="logo-container">
              <div className="logo">JK</div>
              <div className="logo-text">JaldiKaam</div>
            </div>
          </Link>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <Link to="/" className="nav-link">Home</Link>

          <div
            style={{ position: "relative" }}
            onClickCapture={() => setServicesOpen(!servicesOpen)}
          >
            <button className="nav-link btn">Services ▾</button>
            {servicesOpen && (
              <div className="dropdown-panel">
                {categories.map((g) => (
                  <div key={g.group} className="dropdown-group">
                    <h4>{g.group}</h4>
                    <ul>
                      {g.items.map((i) => (
                        <li key={i.slug}>
                          <Link to={`/search?category=${i.slug}`}>
                            {i.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="nav-link">About</Link>
          <Link to="/support" className="nav-link">Contact</Link>

          <span
            id="icon-container"
            onMouseEnter={() => setSearch(false)}
            onMouseLeave={() => setSearch(true)}
          >
            {search ? (
              <FaSearch className="icon" size={20} />
            ) : (
              <form
                action="/search"
                method="GET"
                className="search"
                style={{ marginLeft: 12 }}
              >
                <input name="q" placeholder="Search services..." />
                <button type="submit">Search</button>
              </form>
            )}
          </span>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {!user && (
            <>
              <Link to="/auth/login" className="nav-link">Login</Link>
              <Link to="/auth/register" className="btn btn-primary">Sign up</Link>
            </>
          )}

          {isCustomer && (
            <>
              <Link to="/dashboard/customer" className="nav-link">My Bookings</Link>
              <Link to="/settings/profile" className="nav-link">Profile</Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </>
          )}

          {isProvider && (
            <>
              <Link to="/dashboard/provider" className="nav-link">My Jobs</Link>
              <Link to="/provider/onboard" className="nav-link">Add Service</Link>
              <Link to="/settings/profile" className="nav-link">Profile</Link>
              <button onClick={logout} className="nav-link">Logout</button>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/dashboard/admin" className="nav-link">Admin Panel</Link>
              <Link to="/settings/profile" className="nav-link">Profile</Link>
              <button onClick={logout()} className="nav-link">Logout</button>
            </>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(v => !v)}>
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

            <details>
              <summary>Services</summary>
              <div style={{ paddingLeft: 12, paddingTop: 8 }}>
                {categories.map((g) => (
                  <div key={g.group}>
                    <strong>{g.group}</strong>
                    <ul>
                      {g.items.map((i) => (
                        <li key={i.slug}>
                          <Link
                            to={`/search?category=${i.slug}`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {i.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>

            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/support" onClick={() => setMenuOpen(false)}>Contact</Link>

            <form action="/search" method="GET" className="search">
              <input name="q" placeholder="Search services..." />
              <button type="submit">Search</button>
            </form>

            {!user && (
              <>
                <Link to="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link
                  to="/auth/register"
                  className="btn btn-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}

            {(isCustomer || isProvider || isAdmin) && (
              <>
                <Link to="/settings/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
