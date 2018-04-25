package com.ciandt.includeday7.backend.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.glassfish.jersey.internal.util.ExceptionUtils;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Created by rodrigogs on 30/01/17.
 */
public class LoggerHelper {
    private static Logger logger = null;
    private static LoggerHelper ourInstance = null;

    public static LoggerHelper getInstance(Logger log) {
        if(ourInstance == null) {
            ourInstance = new LoggerHelper(log);
        }
        return ourInstance;
    }

    public LoggerHelper(Logger log) {
        logger = log;
    }

    public void log(Level loggerLevel, String texto, Object obj) {
        Level level = getLevel(logger);

        try {
            if (level == Level.INFO) {
                if (obj instanceof Exception) {
                    logger.log(loggerLevel, texto + " - Stacktrace: " + ExceptionUtils.exceptionStackTraceAsString((Exception) obj));
                } else {
                    Gson gson = new GsonBuilder().create();
                    String json = gson.toJson(obj);

                    logger.log(loggerLevel, texto + " - Objeto Serializado: " + json);
                }
            }
        } catch (Exception e){
            logger.info("Log - Não foi possível serializar o objeto. Texto: " + texto);
        }
    }

    public void log(String texto, Object obj) {
        Level level = getLevel(logger);

        try {
            if (level == Level.INFO) {
                if (obj instanceof Exception) {
                    logger.severe(texto + " - Stacktrace: " + ExceptionUtils.exceptionStackTraceAsString((Exception) obj));
                } else {
                    Gson gson = new GsonBuilder().create();
                    String json = gson.toJson(obj);

                    logger.info(texto + " - Objeto Serializado: " + json);
                }
            }
        } catch (Exception e){
            logger.info("Log - Não foi possível serializar o objeto. Texto: " + texto);
        }
    }

    private Level getLevel(Logger logger) {
        Level level = logger.getLevel();
        if (level == null && logger.getParent() != null) {
            level = logger.getParent().getLevel();
        }
        return level;
    }
}
