import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { createClient } from "../../features/clients/clientsSlice.js";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Card from "../ui/Card.jsx";
import { t } from "../../lib/i18n.js";

export default function AddClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.clients);
  const users = useSelector((state) => state.auth.user); // Pour assigner un agent

  // États du formulaire
  const [formData, setFormData] = useState({
    // Informations personnelles
    name: "", // Nom complet ou identifiant
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    telephone_secondaire: "",

    // Adresse complète
    adresse_ligne1: "",
    adresse_ligne2: "",
    ville: "",
    code_postal: "",
    pays: "France",

    // Informations client
    type: "acheteur",
    statut: "prospect",
    role: "", // Rôle du client
    budget_min: "",
    budget_max: "",

    // Préférences
    preferences: {
      type_bien: [],
      nombre_pieces: "",
      superficie_min: "",
      quartiers: [],
      equipements: [],
    },

    // Notes
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // Types de clients
  const typesClient = [
    { value: "acheteur", label: "Acheteur" },
    { value: "vendeur", label: "Vendeur" },
    { value: "locataire", label: "Locataire" },
    { value: "proprietaire", label: "Propriétaire" },
  ];

  // Statuts
  const statuts = [
    { value: "prospect", label: "Prospect" },
    { value: "actif", label: "Actif" },
    { value: "en_negociation", label: "En négociation" },
    { value: "converti", label: "Converti" },
    { value: "inactif", label: "Inactif" },
  ];

  // Types de biens
  const typesBien = [
    "Appartement",
    "Maison",
    "Villa",
    "Studio",
    "Loft",
    "Duplex",
    "Terrain",
    "Commerce",
    "Bureau",
  ];

  // Équipements
  const equipements = [
    "Parking",
    "Garage",
    "Jardin",
    "Terrasse",
    "Balcon",
    "Piscine",
    "Ascenseur",
    "Cave",
    "Climatisation",
    "Chauffage central",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const current = prev.preferences[category] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          [category]: updated,
        },
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.telephone.trim())
      newErrors.telephone = "Le téléphone est requis";

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (formData.budget_min && formData.budget_max) {
      if (parseFloat(formData.budget_min) > parseFloat(formData.budget_max)) {
        newErrors.budget_max =
          "Le budget max doit être supérieur au budget min";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Veuillez remplir tous les champs obligatoires", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      await dispatch(createClient(formData)).unwrap();
      toast.success("Client ajouté avec succès ! 🎉", {
        duration: 4000,
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/clients");
      }, 1000);
    } catch (err) {
      console.error("Erreur lors de la création du client:", err);
      toast.error(err.message || "Erreur lors de la création du client", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Toast Notifications */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/clients")}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Ajouter un nouveau client
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Remplissez tous les champs nécessaires pour créer un nouveau client
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400"
          >
            {String(error)}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Informations personnelles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom complet / Identifiant"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Jean Dupont"
                className="md:col-span-2"
              />

              <Input
                label="Nom *"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                error={errors.nom}
                placeholder="Dupont"
              />

              <Input
                label="Prénom *"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                error={errors.prenom}
                placeholder="Jean"
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="jean.dupont@example.com"
              />

              <Input
                label="Téléphone *"
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                error={errors.telephone}
                placeholder="+33 6 12 34 56 78"
              />

              <Input
                label="Téléphone secondaire"
                type="tel"
                name="telephone_secondaire"
                value={formData.telephone_secondaire}
                onChange={handleChange}
                placeholder="+33 6 98 76 54 32"
              />

              <Input
                label="Rôle"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={errors.role}
                placeholder="Ex: Particulier, Investisseur, Entreprise"
              />
            </div>
          </Card>

          {/* Adresse */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Adresse
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Adresse ligne 1"
                name="adresse_ligne1"
                value={formData.adresse_ligne1}
                onChange={handleChange}
                placeholder="123 Rue de la République"
              />

              <Input
                label="Adresse ligne 2"
                name="adresse_ligne2"
                value={formData.adresse_ligne2}
                onChange={handleChange}
                placeholder="Appartement 4B, Bâtiment C"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Paris"
                />

                <Input
                  label="Code postal"
                  name="code_postal"
                  value={formData.code_postal}
                  onChange={handleChange}
                  placeholder="75001"
                />

                <Input
                  label="Pays"
                  name="pays"
                  value={formData.pays}
                  onChange={handleChange}
                  placeholder="France"
                />
              </div>
            </div>
          </Card>

          {/* Informations client */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Informations client
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Type de client *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {typesClient.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Statut *
                </label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {statuts.map((statut) => (
                    <option key={statut.value} value={statut.value}>
                      {statut.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Budget minimum (€)"
                type="number"
                name="budget_min"
                value={formData.budget_min}
                onChange={handleChange}
                placeholder="150000"
                min="0"
                step="1000"
              />

              <Input
                label="Budget maximum (€)"
                type="number"
                name="budget_max"
                value={formData.budget_max}
                onChange={handleChange}
                error={errors.budget_max}
                placeholder="300000"
                min="0"
                step="1000"
              />
            </div>
          </Card>

          {/* Préférences */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              Préférences
            </h2>

            <div className="space-y-6">
              {/* Types de bien */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Types de bien recherchés
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {typesBien.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.preferences.type_bien.includes(type)}
                        onChange={() => handleCheckboxChange("type_bien", type)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nombre de pièces et superficie */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre de pièces"
                  type="number"
                  name="nombre_pieces"
                  value={formData.preferences.nombre_pieces}
                  onChange={handlePreferenceChange}
                  placeholder="3"
                  min="1"
                />

                <Input
                  label="Superficie minimum (m²)"
                  type="number"
                  name="superficie_min"
                  value={formData.preferences.superficie_min}
                  onChange={handlePreferenceChange}
                  placeholder="80"
                  min="0"
                />
              </div>

              {/* Équipements */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Équipements souhaités
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {equipements.map((equipement) => (
                    <label
                      key={equipement}
                      className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.preferences.equipements.includes(
                          equipement
                        )}
                        onChange={() =>
                          handleCheckboxChange("equipements", equipement)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {equipement}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-cyan-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Notes
            </h2>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Notes supplémentaires sur le client, ses besoins spécifiques, remarques importantes..."
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/clients")}
              className="sm:w-auto w-full"
            >
              Annuler
            </Button>

            <Button
              type="submit"
              loading={status === "loading"}
              className="sm:w-auto w-full"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Créer le client
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
