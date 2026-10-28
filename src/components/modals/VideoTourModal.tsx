import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { UrduDaftar } from '../common/UrduDaftar';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTourModal: React.FC<VideoTourModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1020]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-3xl border border-slate-800 bg-[#0B1020] p-4 sm:p-6 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </span>
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-1">
                  <span>Hub</span> <UrduDaftar /> <span>— 90-Second Platform Walkthrough</span>
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-[#11172B] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <video
                src="/videos/admin_overview.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="text-xs text-slate-400 text-center mt-4">
              Watch how our own agency team runs daily attendance, client password vault, and project profit margins.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
